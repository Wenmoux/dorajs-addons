module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let items = []
let url =`https://oapi.95.cn/show/anchor_list_v4.php?type=${args.id}&page_index=${page||0}&is_intl_pack=1`
    res = await $http.get(url)
   list = res.data.user_info

   list.map(data => {
    
      items.push({
        title: data.signature,
        image: data.head_image,
        style: 'live',
        spanCount: 6,
        viewerCount: data.live_num,
        author: {
          name: data.nickname,
          avatar: data.anchor_new_image
        },
        route:$route('@video',{url:`http://play.95xiu.com/app/${data.moods==5?`p${data.uid}`:data.uid}.flv?k=1092dc67c9402014144fc19181974172&t=540fb568`})
      })
    })
   
    return {
      items: items,
      nextPage: (page||0)+1
    }    
  
  }
}
