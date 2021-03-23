this.vid=null
module.exports = {
    type: 'video',
    async fetch({
        args,
        page
    }) {            
     
      let   dmurl="https://api-new.app.acfun.cn/rest/app/new-danmaku/poll?market=appstore&app_version=6.24.1.390&product=ACFUN_APP&origin=ios&sys_name=ios&egid=DFP839FB814A6D110559D2564E673BEA2774594C686A369BBA07E0FA5AA086E0&sys_version=13.6&resolution=2048x1536&ftt="
      let   dmdata=`did=93B8B804-B138-4D63-8A35-DE9035FE4AFC&lastFetchTime=0&resourceTypeId=9&videoId=${args.vid?args.vid:this.vid}`
      const header={headers:{
           "udid":"93B8B804-B138-4D63-8A35-DE9035FE4AFC"     
   }} 
   
    let resdm = await $http.post(dmurl,dmdata,header)  
    this.dm = resdm.data.added
    let items = []
    let options = []
         if (args.type == 1) {
            let url = `https://api-new.acfunchina.com/rest/app/douga/info?mkey=AAHewK3eIAAyMjAwNzQ5MjUBAhAAMEP1uwQzed6KYAAAAPcfJl8UWqSpEZcS-S3A%0D%0A037gnn9h4r63X9eiAN7WpyfhBQX95IrtiAGzhf-o4P-gmcgPtJ0izmd26BuNCQZg%0D%0A5kHIEXDGL17EZCRUVxdMgZAxEJwgjb1cCx2vkWl5kYjElw%3D%3D&market=appstore&app_version=6.24.0.388&product=ACFUN_APP&sys_version=13.5&priority=0&egid=DFPC0D9972AB4AEF0F57FAD8437DBC6CAD35548B567E77BB25A061A74D89D3A2&origin=ios&ftt=&dougaId=${args.id}&resolution=2048x1536&sys_name=ios`
            let items = []
             res = await $http.get(url, appheader)           
            list = JSON.parse(res.data.currentVideoInfo.ksPlayJson).adaptationSet.representation
            this.vid=res.data.currentVideoInfo.id
            list.map(data => {              
                options.push({
                    title: data.qualityLabel,
                    url: data.url
                })
            })            
            select = 0
        }
       else if (args.type == 3) {
       list =args.data 
      list.map(data => {              
                options.push({
                    title: data.qualityLabel,
                    url: data.url
                })
            })            
            select = 0  
        }       
         else {
            let url = "https://api.kuaishouzt.com/rest/zt/live/web/startPlay?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=1000000041318851&did=H5_68228709057E7524&acfun.api.visitor_st=ChRhY2Z1bi5hcGkudmlzaXRvci5zdBJwvNv9HAnERxU-UZRnrOYHDQRU4QriiYM3V7QRbF5ah1kwKOPt39BqQ1VOpf8MLuTr5ismUHj4eHyC5yEKALmdjn_UtOO9FOinZjtCl9s8LjV6BkKO3ZgxdNYIefvhFvH23xNkwrXFjaalhgV2NSHZKRoSHNQnauim_ePPhRZ9d6hxF_i6IiBypQXpJNEQgYNfN54szw-t01RneEMhqElBHDHIY5bLgygFMAE"
            let data = `authorId=${args.id}&pullStreamType=FLV`
            let res = await $http.post(url, data,{headers:{"referer":`https://live.acfun.cn/live/${args.id}`}})
            let str = JSON.parse(res.data.data.videoPlayRes.replace(/name/g, "title"))
            options = str.liveAdaptiveManifest[0].adaptationSet.representation
            select = options.length - 1
        }            
    
        return {
            selectors: [{
                title: '清晰度',
                select: select,
                onSelect: option => {
                    this.url = option.url
                    console.log(this.url)
                },
                options: options
            }],
            url: options[select].url
        }                                        
    },
      async startDanmaku() {    
    if (this.dm) {
      var i = 0
      this.danmuScheduler = setInterval(() => {
        i++
        if (i <this.dm.length) {
          this.addDanmaku({
            content: this.dm[i].body
          })
        }
      }, 1000)
    }
  } ,
  stopDanmaku() {
    console.log('stopDanmaku')
    clearInterval(this.danmuScheduler)
  }       
}