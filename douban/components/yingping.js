module.exports = {
  async fetch({ page, args }) {
    try {

      url = `https://api-shoulei-ssl.xunlei.com/cinecism/api/v4/cinecism/list_cinecism_latest?size=20&cursor=${page||0}`   
    console.log(url)
    let resp = await $http.get(url)
    //console.log(resp.data)
    let list =resp.data.data.array
    let items = list.map(data=> {
      return{
        style: 'article',
        image: data.cinecism.cover_url,
        title: data.cinecism.title,  
        time:formatDate(data.cinecism.create_time), 
        author:{
          name:"tag："+ ((data.cinecism.tag!=""&&data.cinecism.tag)?data.cinecism.tag:data.media_info.name),
        },
        summary:data.cinecism.summary,
        route: $route('article', {
          url: data.cinecism.body_url,
          image:data.cinecism.cover_url
         
        })
      }
    })
    return {
      nextPage:page+ 20,
      items: items
    }
} catch (e) {
    console.log(e)
} 
//抄自 酷安插件 作者@cinhoo
   function  formatDate(timeStamp) {
     console.log(Date.now())
     console.log(timeStamp)
    let diff = (Date.now() - timeStamp*1000 )/1000
    if (diff < 60) {
      return '刚刚'
    } else if (diff < 3600) {
      return `${parseInt(diff / 60)}分钟前`
    } else if (diff < 86400) {
      return `${parseInt(diff / 3600)}小时前`
    }  else {
      let date = new Date(timeStamp*1000)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  }
  }
}
