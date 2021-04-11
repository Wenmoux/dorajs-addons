module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let res= await $http.get(`${baseurl_xj}/index?pid=&apiVersion=29&deviceModel=Redmi%20K30&brand=Redmi&deviceName=phoenix&serial=unknown&platform=android&version=3.8.3&_t=`)
    items=res.data.data
    //console.log(res.data)
    delete items.mbsliderows
    delete items.pcsliderows
    delete items.v2sliderows
    delete items.sliderows
    let str=[]
    i=0
    Object.keys(items).forEach(key => {
    str[i++]=key
  })
tags={
  "dayrows":"香蕉头条",
  "latestrows":"最新视频",
  "likerows":"猜你喜欢",
  "a_vodrows":"偷拍自拍",
  "b_vodrows":"成人动漫",
  "c_vodrows":"经典伦理",
  "d_vodrows":"中文字幕",
  "tagvodrows":"不雅视频",
  "hotrows":"热片视频"
  
}
item=[]
  str.map(data=> {
      list = items[data]
      item.push({
        title:tags[data],
        style:"category"      
      })
      list.map(data=> {
        item.push({
          title:data.title,
          image:data.coverpic,
          style:"live",
          label:data.tags[0]?data.tags[0].tagname:"",
          viewerCount:data.playcount_total,
          route:$route("detail",{id:data.vodid})                   
        })                
      })      
    })    
    return item
  }
}
