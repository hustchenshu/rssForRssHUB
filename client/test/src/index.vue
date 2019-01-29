<template>
    <div id="app">
        <nav :class="['sider',{'show':show}]">
            <div 
                v-for="(it,index) in rssConfig"
                :key="index"
                v-text="it.name"
                @click="type = index">
            </div>
        </nav>
        <div :class="['content',{'show':show}]">
            <nav class="header">
                <ul class="nav-ul">
                    <li class="nav-li" @click="toggleSider">
                        <div class="mesnu" v-text="show? '<<':'>>'"></div>
                    </li>
                    <li :class="['nav-li',{'select': ((!selected && index===0) || (selected == index)) }]"  
                        v-for="(it,index) in rss" 
                        :key="index" 
                        v-text="it.name"
                        @click="selected = index">
                    <li/>
                </ul>
            </nav>
            <SiteRSS v-if="result && result.item"
                :item="result.item"
            ></SiteRSS>
        </div>

    </div>
</template>

<style scoped>
#app{
    width: 100%;
    overflow: hidden;
}
.sider{
    width:0;
    /* min-height: 100vh; */
    top:0rem;
    transition: all .3s;
    background-color: #71777c;
    float: left;
    overflow: hidden;
    height: 100%;
}
.sider.show{
    width:3rem;
}
.content{
    margin-left:0;
    width:100vw;
    transition: all .3s;
}
.content.show{
    margin-left: 3rem;
}
.sider>.menu{
    position:absolute;
    right: -20px;
}
.header{
    position: fixed;
    top: 0rem;
    width: 100%;
    height: 0.8rem;
    z-index: 100;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    transition: all .2s;
    transform: translateZ(0);
    background-color: aliceblue;
}
.header::before{
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    height: 200%;
    z-index: -1;
}
.nav-ul{
    list-style-type: disc;
    margin-block-start: 0.1em;
    margin-block-end: 0.1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 10px;
    position: relative;
    width: auto;
    overflow-x: auto;
    max-width: 960px;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    line-height: 1;
}
.nav-li{
    list-style: none;
    padding: 0 0.15rem;
    color: #71777c;
    height: 100%;
    align-items: center;
    display: flex;
    flex-shrink: 0;
    font-size: 0.3rem;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    max-width: 2.5rem;
    text-overflow: clip;
    white-space: nowrap;
}
.nav-li.select{
    color: #007fff;
}
</style>

<script>

    const Api = require("../../../common/api")
    import SiteRSS from "./components/section.vue"

    export default {
        components: {
            SiteRSS,
        },
        data(){
            const syncData = this.$root.$data;// 接受来自父组件的data
            return Object.assign({
                result:{},
                selected:null,
                show:false,
                type:null,
            },syncData)
        },
        watch:{
            selected(newVal,oldVal){
                if(newVal){
                    const url = this.rss[newVal].src;
                    let self = this;
                    Api.getContent(url).then((value) =>{
                        console.log("get for",url)
                        self.result = value;
                    })
                }
            },
            type(newVal,oldVal){
                if(newVal !==null){
                    this.rss = this.rssConfig[newVal].rss;
                    if(this.selected === null){
                        this.selected = 0;
                    }
                    const url = this.rss[0].src;
                    let self = this;
                    Api.getContent(url).then((value) =>{
                        console.log("get for",url)
                        self.result = value;
                    })
                }
            }

        },
        mounted(){
            let self = this;
            if(self.rss.length > 0){
                const url = self.rss[0].src;
                // self.selected = 0;
                Api.getContent(url).then((value) => {
                    self.result = value;
                    console.log("first page content")
                })
            }
        },
        methods:{
            toggleSider(){
                this.show = ! this.show;
            },
        }
    }
</script>

