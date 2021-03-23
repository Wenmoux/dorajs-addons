module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let cookie = $prefs.get("acookie")
    let url =`https://www.acfun.cn/rest/pc-direct/feed/followFeed?isGroup=0&gid=0&count=10&pcursor=${page||1}`
     let res = await $http.get(url,{headers:{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.111 Safari/537.36","cookie":$prefs.get("acookie")}})
       let items = []
    res.data.feedList.map(list => {
      items.push({
        title: list.title, 
        style:"list",
        summary:list.author+" • "+formatDate(list.releaseDate)+"•"+list.views+"浏览•"+list.comments+"评论",
        image:list.titleImg,       
        route: $route('video', {
          id: list.cid,
          type:1
        })
      })
    })
     //抄自 酷安插件 作者@cinhoo
   function  formatDate(timeStamp) {
    let diff = (Date.now() - timeStamp ) / 1000
    if (diff < 60) {
      return '刚刚'
    } else if (diff < 3600) {
      return `${parseInt(diff / 60)}分钟前`
    } else if (diff < 86400) {
      return `${parseInt(diff / 3600)}小时前`
    }  else {
      let date = new Date(timeStamp)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  }
   return {items:items,nextPage:(page||1)+1}     
  }
}
