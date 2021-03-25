module.exports = {
  async fetch({ page, args }) {
    let items=[]
      
      url = `https://m.douban.com/rexxar/api/v2/${args.key}/${args.id}/reviews?count=20&order_by=&start=${page||0}&ck=&for_mobile=1`      
     
        let resp = await $http.get(url,{headers:{"Referer":"https://m.douban.com"}})
        let list =resp.data.reviews
    list.map(data=> {
     items.push({
        style: 'article',
        title: data.title,  
        time:data.create_time,
        author:{
          name:data.rating?(data.user.name+" "+data.rating.value+"⭐️"):data.user.name
        },
        summary:data.abstract,
        route:$route("article",{
          id:data.id,
          type:1
        })
      })
    })    
return{
      nextPage:(page||0)+ 25,
      items: items
    }
  }
}
