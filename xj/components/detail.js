module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let xjauth =$prefs.get("xjauth")
  let headers={cookie:"xxx_api_auth="+xjauth} 
    this.allowBookmark = true
    let url = `${baseurl_xj}/vod/show/${args.id}`    
    let res = await $http.get(url)    
   let vodrow=res.data.data.vodrow    
  let items=[{
        title: vodrow.title,
        style: 'gallery',
        image: vodrow.coverpic,       
      }]
   items.push({
      style:'simple',    
      spanCount:8,
      image:$icon('play_arrow','black'),
      onClick:async function(){
       let url =`${baseurl_xj}/vod/reqdown/${args.id}`
       let res =await $http.get(`${baseurl_xj}/vod/reqplay/${args.id}?pid=&apiVersion=29&deviceModel=Redmi%20K30&brand=Redmi&deviceName=phoenix&serial=unknown&platform=android&version=3.8.3&_t=1618077726093`,{headers})     
       let videourl = res.data.data.httpurl
       $router.to($route("@video",{url:videourl}))
      }
    },
   {
      style:'simple',
      spanCount:4,
      image:$icon('file_download','black'),
      onClick:async function(){
       let url =`${baseurl_xj}/vod/reqdown/${args.id}`
       let dres=await $http.get(url,{headers})
       let downloadurl=dres.data.data.httpurl
       $ui.browser(downloadurl)
        
        
      }
    } 
    )
   let tags = vodrow.tags.map(data => {
        return {
          title: data.tagname,
          route: $route('specialist', {
            keyword:data.tagname
          })
        }  
      })
      
    items.push({
      style:'chips',
      actions:tags
    },{
      title:"同类推荐",
      style:"category"
    })
    
    
    res.data.data.likerows.map(list => {     
       items.push({
          title: list.title, 
          image:list.coverpic,
          style:"list",       
          route: $route('detail', {
            id: list.vodid
          })
        })
      })      
    return items
  }
}
