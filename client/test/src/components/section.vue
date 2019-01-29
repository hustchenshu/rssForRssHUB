<template>
    <div class="content-box">
        <ul v-for="(it,index) in item" :key="index" >
            <Article 
                :title="it.title && it.title[0] || undefined"
                :description="it.description && it.description[0] || undefined"
                :link="it.link && it.link[0] || undefined"
                :pubDate="it.pubDate && it.pubDate[0] || undefined"/>
        </ul>
    </div>
</template>

<style scoped>
.content-box{
    width: 100%;
    margin-top: 1rem;
    max-width: 800px;
}
.title{
    color: #007fff;
}
ul{
    width: 100%;
    background-color: #fff;
}
</style>


<script>
import Article from "./article.vue"
import "../../../../public/css/juejin.css"

export default {
    props: ['title','item'],
    components: {
        Article
    },
}
</script>



