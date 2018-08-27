<!-- loading -->
<template>
 <div id="load">
    <div class="k-line2 k-line12-1"></div>
    <div class="k-line2 k-line12-2"></div>
    <div class="k-line2 k-line12-3"></div>
    <div class="k-line2 k-line12-4"></div>
    <div class="k-line2 k-line12-5"></div>
    <div class="k-line2 k-line12-6"></div>
    <p>正在加载</p>
</div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },

        components: {},

        computed: {},

        mounted(){},

        created(){},

        methods: {}
    }
</script>
<style>
#load{
    width: 100%;
    height:100px;
    margin-top: 20px;
    color:#333;
}
#load>p{
    padding-top: 10px;
}
.k-line2 {
	display:inline-block;
	height:10px;
	width:10px;
	opacity:0;
	border-radius:50%;
    transition: all .4s;
	transform:translateX(-240px);
	background-color:#000
}
.k-line12-1 {
	animation:k-loadingS 3s infinite;
	animation-delay:.6s
}
.k-line12-2 {
	animation:k-loadingS 3s infinite;
	animation-delay:.5s
}
.k-line12-3 {
	animation:k-loadingS 3s infinite;
	animation-delay:.4s
}
.k-line12-4 {
	animation:k-loadingS 3s infinite;
	animation-delay:.3s
}
.k-line12-5 {
	animation:k-loadingS 3s infinite;
	animation-delay:.2s
}
.k-line12-6 {
	animation:k-loadingS 3s infinite;
	animation-delay:.1s
}
@keyframes k-loadingS {
	40% {
	transform:translateX(0);
	opacity:.9
}
100% {
	transform:translateX(240px);
	opacity:0
}
}
</style>