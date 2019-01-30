<template>
    <div id="app">
        <LoadMask :loading="loading"></LoadMask>
        <div style="width: 100%; height: 100%; position: fixed;">
            <nav :class="['sider',{'show':show}]">
                <div class="logo"></div>
                <div class="catelogy"
                    v-for="(it,index) in rssConfig"
                    :key="index"
                    @click="!loading && (type = index)">
                    <div class="icon-catelogy" :style="{backgroundImage:`url(../../../public/img/${it.icon})`}"></div>
                    <span>{{it.name}}</span>
                </div>
            </nav>
        </div>
        
        <div :class="['content',{'show':show}]">
            <nav class="header">
                <div style="width:.8rem;height:.8rem;position:absolute;left:0">
                    <div class="menu" 
                        @click="toggleSider" 
                        :style="{backgroundImage:`url(${expandImg})`}">
                    </div>
                </div>

                <ul class="nav-ul">
                    <li class="nav-li" @click="preNav">
                        <nav class="left-nav"></nav>
                    </li>
                    <li :class="['nav-li',{'select': ((!selected && index===0) || (selected == index)) }]"  
                        v-for="(it,index) in rss" 
                        :key="index" 
                        v-text="it.name"
                        @click="!loading && (selected = index)">
                    <li/>
                    <li class="nav-li" @click="nextNav">
                        <nav class="right-nav"></nav>
                    </li>
                </ul>
            </nav>
            <SiteRSS v-if="result && result.item"
                :item="result.item"
            ></SiteRSS>
        </div>

    </div>
</template>

<style scoped>
.logo{
    background: no-repeat url("/public/img/icon.png");
    width: 100%;
    height: 3rem;
    background-size: contain;
}
.catelogy{
    margin: 10px 0 5px 8px;
    color:#007fff;
    font-size: 0.3rem;
    font-weight: bold;
    white-space: nowrap;
}
.icon-catelogy{
    background: no-repeat url("/public/img/icon.png");
    height: 0.3rem;
    width: 0.3rem;
    background-size: contain;
    display: inline-block;
}
.mask{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: #666666e8;
    z-index: 200;
}
#app{
    width: 100%;
    overflow: hidden;
}
.sider{
    width:0;
    /* min-height: 100vh; */
    top:0rem;
    transition: all .3s;
    background-color: #FFD0A0;
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
.menu{
    width:0.3rem;
    height: 0.3rem;
    background-size: contain;
    position:absolute;
    left: .2rem;
    top:.25rem;
    z-index: 240;
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

.left-nav{
    width:0.6rem;
    height: 0.6rem;
    background-size: contain;
    background-image: url("../../../public/img/toleft.png")
}
.right-nav{
    width:0.6rem;
    height: 0.6rem;
    background-size: contain;
    background-image: url("../../../public/img/toright.png")
}
.nav-ul{
    list-style-type: disc;
    margin-block-start: 0.6rem;
    margin-block-end: 0.6rem;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: .6rem;
    position: relative;
    width: auto;
    overflow-x: auto;
    max-width: 960px;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    line-height: .8rem;
}
.nav-ul::-webkit-scrollbar{
    width: 2px;
    background: none;
}
.nav-li{
    list-style: none;
    padding: 0 0.15rem;
    color: #71777c;
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
    line-height: .8rem;
}
.nav-li:last-child{
    position: fixed;
    right: 0;
    z-index: 300;
    background-color: aliceblue;
}
.nav-li:nth-child(2){
    margin-left: 1rem;
}
.nav-li:first-child{
    position: fixed;
    left: 0.6rem;
    z-index: 300;
    background-color: aliceblue;
}
.nav-li.select{
    color: #007fff;
}
</style>

<script>

    const Api = require("../../../common/api")
    import SiteRSS from "./components/section.vue"
    import LoadMask from "./components/loading.vue"

    export default {
        components: {
            SiteRSS,
            LoadMask
        },
        data(){
            const syncData = this.$root.$data;// 接受来自父组件的data
            return Object.assign({
                result:{},
                selected:null,
                show:false,
                type:null,
                loading:false
            },syncData)
        },
        computed:{
            expandImg(){
                if(this.show){
                    return "../../../public/img/left.png"
                }
                return "../../../public/img/right.png"
            }
        },
        watch:{
            selected(newVal,oldVal){
                if(newVal!==null && newVal!==oldVal){
                    const url = this.rss[newVal].src;
                    let self = this;
                    self.loading = true;
                    Api.getContent(url).then((value) =>{
                        console.log("get for",url)
                        self.result = value;
                        self.loading = false;
                    },(err)=>{
                        console.log(err);
                        self.loading = false;
                    })
                }
            },
            type(newVal,oldVal){
                if(newVal !==null){
                    this.rss = this.rssConfig[newVal].rss;
                    // if(this.selected === null){
                        this.selected = 0;
                    // }
                    const url = this.rss[0].src;
                    let self = this;
                    self.loading = true;
                    Api.getContent(url).then((value) =>{
                        console.log("get for",url)
                        self.result = value;
                        self.loading = false;
                    },(err)=>{
                        console.log(err);
                        self.loading = false;
                    })
                    self.show = false;
                }
            }

        },
        mounted(){
            let self = this;
            if(self.rss.length > 0){
                const url = self.rss[0].src;
                // self.selected = 0;
                self.loading = true;
                Api.getContent(url).then((value) => {
                    self.result = value;
                    self.loading = false;
                    console.log("first page content")
                },(err)=>{
                    console.log(err);
                    self.loading = false;
                })
            }
        },
        methods:{
            toggleSider(){
                this.show = ! this.show;
            },
            preNav(){
                this.selected > 0 && (this.selected--)
            },
            nextNav(){
                (this.selected < this.rss.length -1) && (this.selected++)
            }
        }
    }
</script>

