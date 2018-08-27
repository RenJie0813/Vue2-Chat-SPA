exports.install=function(Vue,options){
    Vue.prototype.minImg=function(options){
        let _this=this,maxSize=options.maxSize||1280,loading=options.showLoading||false;            
        startMinImg(options.file,options.cb);

        function canvasDataURL(path, callback){
            var img = new Image();
            img.src = path;
            img.onload = function(){
                var that = this;
                // 默认按比例压缩
                var w = that.width,
                    h = that.height;
                var quality = 0.7;  // 默认图片质量为0.7
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
            
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                callback(base64);
            }
        };
        /**
         * 将以base64的图片url数据转换为Blob
         * 用url方式表示的base64图片数据
         */
        function convertBase64UrlToBlob(urlData,callback){
            var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            callback(new Blob([u8arr], {type:mime}));
        };
        //图片压缩
        function startMinImg(file,cb){
            var myimage=new Image(),newImg=URL.createObjectURL(file);
            myimage.src=newImg;
            !!cb&&cb(newImg);
            myimage.onload=function(){
                loading&&_this.$dialog.loading.open("正在上传");                
                if (typeof myimage.naturalWidth == "undefined") {
                    // IE 6/7/8
                    var w = myimage.width;
                    var h = myimage.height;
                }
                else {
                    // HTML5 browsers
                    var w = myimage.naturalWidth;
                    var h = myimage.naturalHeight;
                }
                //判断是否需要压缩
                if((file.size/1024)>400) {
                    var resCanvas = document.getElementById('minImg');
                    //若需要进行压缩，判断手机型号
                    if (!_this.$store.state.app.isAndroid){
                        var maxSide = Math.max(w, h);
                        if (maxSide > maxSize) {
                            var minSide = Math.min(w, h);
                            minSide = minSide / maxSide * maxSize;
                            maxSide = maxSize;
                            if (w > h) {
                                w = maxSide;
                                h = minSide;
                            }
                            else {
                                w = minSide;
                                h = maxSide;
                            }
                        }
                        // msg.content.contentWidth=w;
                        // msg.content.contentHeight=h;
                        var mpImg = new MegaPixImage(file);
                        mpImg.render(resCanvas, { maxWidth:w,maxHeight:h,  quality:.5 },function(){
                            convertBase64UrlToBlob(resCanvas.src,function(newblob){
                                getUpload(newblob);
                            })
                        });
                    }
                    else {
                        var orientation=null;
                        EXIF.getData(file,function(){    orientation=EXIF.getTag(this,'Orientation');  });
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            getImgData(reader.result,orientation,function(data,ww,hh){
                                //这里可以使用校正后的图片data了
                                    convertBase64UrlToBlob(data,function(blob){
                                    var mpImg = new MegaPixImage(blob);
                                    msg.content.contentWidth=Math.abs(Math.floor(ww));
                                    msg.content.contentHeight=Math.abs(Math.floor(hh));
                                    mpImg.render(resCanvas, {
                                        maxWidth: w,
                                        maxHeight: h,
                                        quality: .2
                                    }, function () {
                                            convertBase64UrlToBlob(resCanvas.src, function (newblob) {
                                            getUpload(newblob);
                                        })
                                    });
                                });
                            });
                        }
                        reader.readAsDataURL(file);
                    }
                }
                else{
                    getUpload(file);
                }
            }
        };
        //图片信息获取
        function getImgData(img,dir,next){
            var image=new Image();
            image.src=img;
            image.onload=function(){
                var degree=0,drawWidth,drawHeight,width,height;  drawWidth=this.naturalWidth;    drawHeight=this.naturalHeight;  //以下改变一下图片大小
                var maxSide = Math.max(drawWidth, drawHeight);
                if (maxSide > maxSize) {
                    var minSide = Math.min(drawWidth, drawHeight);    minSide = minSide / maxSide * maxSize;    maxSide = maxSize;
                    if (drawWidth > drawHeight) {
                        drawWidth = maxSide;      drawHeight = minSide;
                    }
                    else {
                        drawWidth = minSide;      drawHeight = maxSide;
                    }
                }
                var canvas=document.createElement('canvas');  canvas.width=width=drawWidth;  canvas.height=height=drawHeight;
                var context=canvas.getContext('2d');
                //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
                switch(dir){
                    //iphone横屏拍摄，此时home键在左侧
                    case 3:      degree=180;      drawWidth=-width;      drawHeight=-height;      break;
                    //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
                    case 6:      canvas.width=height;      canvas.height=width;       degree=90;      drawWidth=width;      drawHeight=-height;      break;    //iphone竖屏拍摄，此时home键在上方
                    case 8:      canvas.width=height;      canvas.height=width;       degree=270;      drawWidth=-width;      drawHeight=height;      break;
                }
                //使用canvas旋转校正
                context.rotate(degree*Math.PI/180);  context.drawImage(this,0,0,drawWidth,drawHeight);
                //返回校正图片
                if(dir==6||dir==8){
                    next(canvas.toDataURL("image/jpeg",.2),drawHeight,drawWidth);
                }
                else{
                    next(canvas.toDataURL("image/jpeg",.2),drawWidth,drawHeight);
                }
            }
        };
        function getUpload(file){
            // return;
            $axios.post(options.uploadUrl, file)
            .then(function (response) {
                options.resultCB(response);
                if(loading){
                    _this.$dialog.loading.close();                
                    _this.$dialog.toast({
                        mes: options.sucMsg||"上传成功",
                        timeout: 1200,
                        icon: 'success'
                    });
                }
            })
            .catch(function (error) {
                options.resultCB(error);  
                if(loading){
                    _this.$dialog.loading.close();
                    _this.$dialog.toast({
                        mes: options.errMsg||"上传失败",
                        timeout: 1200,
                        icon: 'error'
                    }); 
                }
            });
        }
    }
}
/**
 * options => Object
 * {
 *  file => 上传的文件 file
 *  maxSize => 压缩后最大尺寸,默认1280
 *  cb => 压缩前回调，可用于预览，返回createObjectURL
 *  uploadUrl => 上传地址
 *  resultCB => 上传完成后回调，返回响应结果
 *  showLoading => 是否显示上传中，默认为true 
 *  sucMsg => 成功消息
 *  errMsg => 失败消息
 * }
 */