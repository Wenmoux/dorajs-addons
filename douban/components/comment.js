module.exports = {
  async fetch({ page, args }) {
    items=[]
    try {

    let url  = `https://m.douban.com/rexxar/api/v2/${args.key}/${args.id}/interests?count=20&order_by=latest&start=${page||0}&ck=&for_mobile=1`   
    let resp = await $http.get(url,{headers:{"Referer":"https://m.douban.com"}})
    let list = resp.data.interests
    items = list.map(data=> {
      return{
        style: 'list',
      image: data.user.avatar,
        title: data.user.name+" • "+data.create_time,  
       summary:data.comment,
      }
    })    
} catch (e) {
    console.log(e)
} 
return {
      nextPage:(page||0)+ 25,
      items: items
    }
  }
}
