module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let items = []
    if (!page && !args.url && !args.id) {
      url = `https://api.memeyule.com//labelpub/list?_=`
     
      res = await $http.get(url)
     // console.log(res)
      res.data.items.map(data => {
        items.push({
          title: data.name,
          style: 'label',
          onClick() {
            this.label = encodeURI(data.name)
            this.nextPage = 0
            this.refresh()
          }
        })
      })
      items.push({
        title: '',
        spanCount: 8
      })
    }
    if (args.id) {
      url = `https://api.memeyule.com/public/room_list?page=${
        page || 1
      }&size=24&sbean=0&ebean=0&live_type=0&_=`
      next = (page || 1) + 1
    } else if (args.url) {
      url = args.url
      next = null
    } else {
      url = `https://api.memeyule.com//labelpub/search?labels=${
        this.label ? this.label : encodeURI('女')
      }&offset=${page || 0}&limit=24&_=`
      next = (page || 0) + 24
    }
    res = await $http.get(url)
    list = res.data.items
    if (args.url || args.id) {
      list = res.data.data
    }
    list.map(data => {
      items.push({
        title: data.notify_msg,
        image: data.audit_app_pic_url,
        style: 'live',
        label: data.labels,
        spanCount: 6,
        viewerCount: data.visiter_count,
        author: {
          name: data.nick_name,
          avatar: data.app_pic_url
        },
        async onClick()
        {
       url= await jx(data.room_ids)
         $router.to($route('@video',{url:url}))
        },
      })
    })
    return {
      items: items,
      nextPage: next
    }    
  async function jx(id) 
  {
    let url = `https://api.memeyule.com/public/hls_pull_url/${id}?_=`
    let res = await $http.get(url)
    return res.data.data
  }     
  }
}
