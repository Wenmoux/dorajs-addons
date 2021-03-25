module.exports = {
  async fetch({ page, args }) {
    this.allowBookmark = true
     url=args.url
     
     let res=  await $http.get(`https://m.douban.com/rexxar/api/v2/${args.key}/${args.id}/`,{headers:{"Referer":"https://www.douban.com/"}})
    // console.log(res)
     let info =res.data
         let items=[{
        title:info.title,
        style: 'richMedia',
        image: info.pic.large,
        rating: {score: info.rating.value/2,total: 5,text: `${info.rating.value} / ${info.rating.count}`},
        summary:info.intro,
        subtitle:info.pubdate[0],
        tags: JSON.parse(JSON.stringify(info.tags).replace(/name/g,"title")),
        actions: [{title: '搜索资源',route: $route('search', {keyword: args.keyword})}]
       }]
  items.push({
    title:"演职员",
    style:"category"
  })
  
     info.actors.map(data=> {
     items.push({
        style: 'icon',
        image: data.cover_url,
        title: data.name,  
        summary:data.abstract
      })
    })   
       
       
    return items
  }
}
