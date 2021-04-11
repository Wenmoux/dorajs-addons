module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    this.allowBookmark = true
    let url = `${baseapi}/play`
    let data = {"uuid":args.uuid,"dl":1}
    let res = await $http.post(url,data,headers)    

   options =JSON.parse(JSON.stringify(res.data.data.quality).replace(/name/g,"title"))
    
  let items=[]
    items.push({
      style:'simple',
      title:res.data.data.video.video_name,
      image:$icon('play_arrow','black'),
      route: $route('@video', {
      selectors: [
        {
          title: '线路',
          select: 0,
          onSelect: option => {
            this.url = option.url
            console.log(this.url)
          },
          options: options
        }
      ],
      url: options[0].url
    })

    })
   let tags = res.data.data.tags.map(data => {
        return {
          title: data.name,
          route: $route('list1', {
            keyword:data.name
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
    
    let res2 = await $http.post(`${baseapi}/playList`,{"uuid":args.uuid,"page":1,"limit":20,"sc":1},headers)    
    res2.data.data.list.map(list => {     
       items.push({
          title: list.video_name, 
          image:list.video_cover,
          style:"list",       
          route: $route('videodetail', {
            uuid: list.uuid
          })
        })
      })      
    return items
  }
}
