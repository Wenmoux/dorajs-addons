module.exports = {
  type: 'list',
  async fetch({
    args,
    page
  }) {
    let url =`${baseapi}/video_class`
    let items = []
    let data = {"page":page||1,"limit":10,"class_id":[args.id]}
    if(args.keyword){
      url =`${baseapi}/search`
      data={"page":page||1,"limit":20,"search":args.keyword}
    }
    let res = await $http.post(url,data,headers)  
   // let items = []
    let list =args.keyword?res.data.data.list:res.data.data.videoList
     list.map(list => {     
       items.push({
          title: list.video_name, 
          image:list.video_cover.replace(/live\/\//,"live\/"),
          style:"list",       
          route: $route('videodetail', {
            uuid: list.uuid
          })
        })
      }) 
 return {
      items,
      nextPage:(page||1)+1      
    }
  }
}