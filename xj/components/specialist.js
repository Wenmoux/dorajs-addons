module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    this.allowBookmark = true
     
   
    let url = args.keyword?`${baseurl_xj}/search?page=${page||1}&wd=${encodeURI(args.keyword)}`:`${baseurl_xj}/special/detail/${args.spid}`
    url =args.type?`${baseurl_xj}/vod/${args.type}-0-0-0-0-0-0-0-0-0-${page||1}`:url
    let res = await $http.get(url)    
   let row=res.data.data.row
    
  let items= !(args.keyword||args.type)?[{
        title: row.spname,
        style: 'gallery',
        image: row.coverpic,
        author:{
          name:row.spname,
          avatar:row.avatar
        }},{          
          title:row.intro,
          style:"category"
        }        
      ]:[]             
    res.data.data.vodrows.map(list => {     
       items.push({
          title: list.title, 
          image:list.coverpic,
          style:"live",
          spanCount:args.type?12:6  ,     
          route: $route('detail', {
            id: list.vodid
          })
        })
      })     
    return {
      items,
      nextPage:args.keyword||args.type?(page||1)+1:null
      
      
    }
  }
}
