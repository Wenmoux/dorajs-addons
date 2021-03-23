module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let items = []
    if(args.id=='coop-mobile-getlivelistnew.php'){
      url = `http://v.6.cn/coop/mobile/index.php?padapi=coop-mobile-getlivelistnew.php&av=3.0&encpass=&logiuid=&type=${args.type}&reft=5004`
   }
   else{
     url = `http://v.6.cn/coop/mobile/index.php?padapi=${args.id}&av=3.0&encpass=&logiuid=&type=&recid=&reft=5004`

   }  // next = (page || 0) + 24
 //  console.log(url)
    res = await $http.get(url)
   list = res.data.content.u2||res.data.content.u1||res.data.content.u0||res.data.content.roomList  
//console.log(res.data)
   list.map(data => {
     console.log(data)
      items.push({
        title: data.userMood,
        image: data.pic,
        style: 'live',
      //  label: data.labels,
        spanCount: 6,
        viewerCount: data.count,
        author: {
          name: data.username,
          avatar: data.picuser
        },
        route:$route('@video',{url:`https://113-142-69-103.xiu123.cn/${data.flvtitle}/playlist.m3u8?_=`})
      })
    })
    //
    return {
      items: items,
    //  nextPage: next
    }    
  
  }
}
