<template>
    <li>
        <!-- <h3 @click="open(link)">{{title}}</h3> -->
        <div class="title">
            <a href="javascript:void(0)" @click="open(link)">{{title}}</a>
            <br/>
            <span class="time" v-if="pubDate">{{new Date(pubDate).toLocaleDateString()}}</span>
        </div>
        
        <!-- <p v-html="description"></p> -->
    </li>
</template>

<style scoped>
.title{
    margin: .1rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.2rem 20px;
}
.title>a{
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
}
.time{
    color:#71777c;
    white-space: nowrap;
    float:right;
    font-weight: lighter;
}
li{
    display: list-item;
    text-align: -webkit-match-parent;
    list-style: none;
    border-bottom: 1px solid rgba(178,186,194,.15);
}
</style>


<script>
export default {
    props:["title","link","description","pubDate"],
    methods:{
        open(link){
            window.location.href = link;
        }
    }
}
</script>
