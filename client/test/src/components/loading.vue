<template>
    <div v-if="loading" class="mask">
        <div class="loading-emoji">
            {{content}}
        </div>
    </div>
</template>

<style scoped>
.mask{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: #666666e8;
    z-index: 200;
}
.loading-emoji{
    width: 80px;
    height: 60px;
    position:absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%)
}
</style>

<script>
export default {
    props:["loading"],
    data(){
        return{
            content:"",
            timer:null
        }

    },
    watch:{
        loading(newVal,oldVal){
            if(newVal){
                this.loop();
                console.log("loading mounted");
            }else{
                this.timer && clearInterval(this.timer)
                console.log("loading unmounted")
            }
        }
    },
    // mounted(){
    //     console.log("loading mounted");
    //     this.loop();
    // },
    // unmounted(){
    //     console.log("loading unmounted")
    //     this.timer && clearInterval(this.timer)
    // },
    methods:{
        loop() {
            var i, n, s = '';

            for (i = 0; i < 10; i++) {
                n = Math.floor(Math.sin((Date.now()/200) + (i/2)) * 4) + 4;

                s += String.fromCharCode(0x2581 + n);
            }

            this.content = s;
            this.timer = setTimeout(this.loop, 50);
        }
    }
}
</script>

