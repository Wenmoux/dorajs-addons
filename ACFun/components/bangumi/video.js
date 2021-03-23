module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let items=[]
    let url =`https://api-new.app.acfun.cn/rest/app/lite/new-bangumi/itemList?app_version=1.11.0.144&market=sm_xiaomi&sys_name=android&appMode=1&socName=%3A%20Qualcomm%20MSM8917&boardPlatform=msm8937&sys_version=6.0.1&product=ACFUN_APP.LITE`
    let data =`bangumiId=${args.id}&pageSize=1000&pageNo=1&mkey=AAHewK3eIAAyMTk3Mzg1MTkAAhAAZYCufARsmh_bYAAAAEMyjy_mir2MdGSK9LGejY3U1N3M4XZrpYqti7rf-VDHXIaDt7AfmxP3WmlbFUIFZUEed_wnBIzY7Sn6n7l-utn9OiqHyrRGJwE6-AekFoLQMYEZnFi7iHZC3lSkbwAePw%3D%3D`
  let url2 =`https://api-new.app.acfun.cn/rest/app/lite/new-bangumi/detail?app_version=1.11.0.144&market=sm_xiaomi&sys_name=android&appMode=1&socName=%3A%20Qualcomm%20MSM8917&boardPlatform=msm8937&sys_version=6.0.1&product=ACFUN_APP.LITE`
    let data2 =`bangumiId=${args.id}`
    //&pageSize=1000&pageNo=1&mkey=AAHewK3eIAAyMTk3Mzg1MTkAAhAAZYCufARsmh_bYAAAAEMyjy_mir2MdGSK9LGejY3U1N3M4XZrpYqti7rf-VDHXIaDt7AfmxP3WmlbFUIFZUEed_wnBIzY7Sn6n7l-utn9OiqHyrRGJwE6-AekFoLQMYEZnFi7iHZC3lSkbwAePw%3D%3D`
   let header ={
     headers:{
      "appVersion":"1.11.0.144",
     "acPlatform":"ANDROID_PHONE"   
      }
   }
    
    let res2 = await $http.post(url2,data2,header)
   
    let res= await $http.post(url,data,header)
   items.push({
   title:res2.data.data.title,  
   image:res2.data.data.coverImageV,
   summary:res2.data.data.intro            
   },{
     title:"剧集列表",
     style:"category"
   }) 
   res.data.items.map(list => {
     list1 = JSON.parse(list.currentVideoInfo.ksPlayJson).adaptationSet.representation
      items.push({
        title: list.episodeName+" • "+list.title,
        style: 'list',
        route: $route('video', {
          data:list1,
          type:3
        })
      })
    })
    return items    
  }
}
