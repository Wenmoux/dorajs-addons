module.exports = {
  type: 'list',  
  async fetch({ args, page }) {   
 
   let url =`https://api-plus.app.acfun.cn/rest/app/user/resource/query?market=appstore&app_version=6.27.1.404&product=ACFUN_APP&origin=ios&sys_name=ios&egid=DFP653AEFDAEBEF03287446FE7780DD57CB25A115692083D3A8244A66BDE955B&sys_version=13.6&resolution=2048x1536&ftt=`
   let data =`authorId=${args.id}&count=20&pcursor=${page||0}&resourceType=2&sortType=3&status=1`
   let res = await $http.post(url,data,appheader)
 let items=[]
  
  if(res.data.feed){
    console.log(res.data)
    res.data.feed.map(list => {
      items.push({
        title: list.title, 
        style:"live",
        author:{
          name:list.user.name,
          avatar:list.avatarFrameMobileImg
        },
        viewerCount:list.viewCount,
        label:list.tagList?list.tagList[0].name:"",
        image:list.coverUrl,       
        route: $route('video', {
          id: list.dougaId,
          type:1
        })
      })
    })
    }
    
    return {items:items,nextPage:(page||0)+1}
   
  }
}
