// var Config = require("../rss.config").default;
var axios = require("axios")
var xml2js = require("xml2js")

exports.getContent = function(url){
    if(url){
        return new Promise( (resolve,reject) => {
            axios.get(url)
            .then(function (response) {
                xml2js.parseString(response.data,function(err, result){
                    if(err){
                        reject(err)
                    }
                    const re =result.rss.channel && result.rss.channel.length > 0 && result.rss.channel[0] || null;
                    console.log(re)
                    resolve(re);
                });
            },(err)=>{
                
                console.log(err)
                reject(err)
            })
        })
    }else{
        // let re = {}
        // const promises = Config.map( (it) => {
        //     return new Promise( (resolve,reject) => {
        //         console.log(it.name)
        //         axios.get(it.src)
        //         .then(function (response) {
        //             xml2js.parseString(response.data,function(err, result){
        //                 if(err){
        //                     reject(err)
        //                 }
        //                 const re =result.rss.channel && result.rss.channel.length > 0 && result.rss.channel[0] || null;
        //                 console.log(re)
        //                 resolve(re);
        //             });
    
        //         },(err)=>{
        //             console.log(err)
        //         })
        //     })
        // })
        // return Promise.all(promises)
    }
}