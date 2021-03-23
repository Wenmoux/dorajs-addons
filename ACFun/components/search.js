module.exports = {
    type: 'list',
    async fetch({
        args,
        page
    }) {
        let items = []
         let url = `https://api-new.app.acfun.cn/rest/app/search/video?mkey=AAHewK3eIAAyMjAwNzUyOTkBAhAAMEP1uwR-NxNHYAAAAMLRelgG9mZWrUWVzbRZ%0D%0AeM_gnn9h4r63X9eiAN7WpyfhBQX95IrtiAGzhf-o4P-gmcgPtJ0izmd26BuNCQZg%0D%0A5kHIEXDGL17EZCRUVxdMgZAxEJwgjb1cCx2vkWl5kYjElw%3D%3D&keyword=${encodeURI(args.keyword)}&market=appstore&channelId=0&sortType=1&app_version=6.24.0.388&product=ACFUN_APP&sys_version=13.5&egid=DFPC0D9972AB4AEF0F57FAD8437DBC6CAD35548B567E77BB25A061A74D89D3A2&origin=ios&ftt=&pCursor=${page||0}&sys_name=ios&resolution=2048x1536`            
       style="live"
       
        if(args.type=="bangumi")
        {
          url=`https://api-new.app.acfun.cn/rest/app/search/bgm?market=appstore&app_version=6.28.1.407&product=ACFUN_APP&origin=ios&keyword=${encodeURI(args.keyword)}&sys_name=ios&egid=DFPC355795D0F3EAE4191CAE58ABFBECDC8ACCE372C8984640AE4D9C22780B6C&sys_version=13.6&resolution=2048x1536&ftt=`
       style="vod"
        }
       let res = await $http.get(url, appheader)  
       list=  res.data.videoList||res.data.bgmList
        list.map(data => {
            items.push({
                title: data.title||data.bgmTitle,
                image: data.coverUrl||data.coverImageV,
                viewerCount: data.viewCount,
                label: data.playDuration||data.description,
                style: style,
                author: {
                   name: args.type!="bangumi"?data.detail.user.name:null,
                   avatar: args.type!="bangumi"?data.detail.user.headUrl:null
                },
                summary:data.bgmIntro,
                
               onLongClick: async() => {
                  id=data.detail.user.id
              info = `toUserId=${id}&action=1&groupId=0`
    let url = `https://www.acfun.cn/rest/pc-direct/relation/follow`  
    let res = await $http.post(url,info,{headers:{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.111 Safari/537.36","cookie":$prefs.get("acookie")   ,"Referer":`https://www.acfun.cn/v/ac${id}`}})
    if (res.data.result == '0') {
      $ui.toast('关注成功')
    } else {
      console.log(res.data)
    }
            },
                route: $route(args.type!="bangumi"?"video":"bangumi/episode", {
                            id:data.contentId||data.bgmId,
                            vid:data.videoId,
                            "type": 1
                })
            })
        })
        return {
          items:items,
          nextPage:args.type!="bangumi"?(page||0)+1:null
        }
        
    }
    
}