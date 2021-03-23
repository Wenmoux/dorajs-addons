module.exports = {
  type: 'topTab',
  async fetch({ args, page }) {
    let url =`https://api-new.app.acfun.cn/rest/app/lite/new-bangumi/detail?app_version=1.11.0.144&market=sm_xiaomi&sys_name=android&appMode=1&socName=%3A%20Qualcomm%20MSM8917&boardPlatform=msm8937&sys_version=6.0.1&product=ACFUN_APP.LITE`
    let data =`bangumiId=${args.id}`
    //&pageSize=1000&pageNo=1&mkey=AAHewK3eIAAyMTk3Mzg1MTkAAhAAZYCufARsmh_bYAAAAEMyjy_mir2MdGSK9LGejY3U1N3M4XZrpYqti7rf-VDHXIaDt7AfmxP3WmlbFUIFZUEed_wnBIzY7Sn6n7l-utn9OiqHyrRGJwE6-AekFoLQMYEZnFi7iHZC3lSkbwAePw%3D%3D`
   let header ={
     headers:{
      "appVersion":"1.11.0.144",
     "acPlatform":"ANDROID_PHONE"   
      }
   }
    let res= await $http.post(url,data,header)

   let resdata =res.data.data
   let list =resdata.related_bangumis
  let items=[]
  list.map(list => {
      items.push({
        title: list.name,
        route: $route('bangumi/video', {
          id: list.id
        })
      })      
    })
   if(list=="")
    {
      items.push({
        title:resdata.title,
        route: $route('bangumi/video', {
          id: resdata.id
        })
      })      
    }
    
    return items
    
  }
}
