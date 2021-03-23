module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let items = []  
  if((page||1) ==1) {
  try {     
   let resi = await $http.get("https://www.acfun.cn/rest/pc-direct/user/personalInfo",{headers:{cookie:$prefs.get("acookie")}}) 
  let res2 =await $http.get("https://www.acfun.cn/member/splash.aspx?time=1614584442943",{headers:{cookie:$prefs.get("acookie")}})
   info=resi.data.info
   console.log(res2.data)
   items.push(
  {
     title:info.userName,
     image:info.headUrl,
     summary:"Lv"+info.level + " 香蕉"+info.banana+ " 金香蕉"+info.goldBanana
   },/*{
     style:"richContent",
     content: {
        markdown: res2.data,
        charset: 'utf-8'
      }
     
   },
   */
   
   {title:"关注列表",
   style:"category"
   })
   
    } catch (err) {           
      $router.to($route("me/login"))
    }  
    }
   let url ="https://www.acfun.cn/rest/pc-direct/relation/oldFriendApi?name=getFollowingList"
   let data =`isGroup=0&groupId=-1&pageNo=${page||1}&pageSize=20`
   let res = await $http.post(url,data,{headers:{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.111 Safari/537.36","cookie":$prefs.get("acookie")       }})         
   
    res.data.friendList.map(list => {
      items.push({
        title: list.userName, 
        style:"icon",
        image:list.userImg, 
        onLongClick: () => {
              this.onLongClick(list.userId)
            },     
        route: $route('me/user', {
          id: list.userId
        })
      })
           
    })
    return {items:items,nextPage:(page||1)+1} 
     
  },
  
  onLongClick: async id => {
    let data = `toUserId=${id}&action=2&groupId=0`
    let url = `https://www.acfun.cn/rest/pc-direct/relation/follow`
    let res = await $http.post(url, data,{headers:{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.111 Safari/537.36","cookie":$prefs.get("acookie")   ,"Referer":`https://www.acfun.cn/v/ac${id}`}})
    if (res.data.result == '0') {
      $ui.toast('取关成功')
      this.refresh()
    } else {
      console.log(res.data)
    }
  }
  
  
}
