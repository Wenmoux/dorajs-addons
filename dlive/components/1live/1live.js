module.exports = {
  type: 'list',
  searchRoute: $route('1live/search'),
  actions: [
    {
      title: '直播地址解析',
      async onClick() {
        let url = await $input.text({
          title: '请输入直播间链接',
          hint: '例如https://m.yizhibo.com/l/mEC6RcLA__1mypAT.html',
          value: ''
        })
        if (url) {
          let scid = url.match(/l\/(.+?).html/)
          if (scid) {
            scid = scid[1]
            let surl = `https://m.yizhibo.com/www/live/get_live_video?scid=${scid}`
            let ress = await $http.get(surl)
            if (ress.data.data.info.status == 10) {
              let playurl = `http://alcdn.f01.xiaoka.tv/live/${scid}.flv`
              $router.to($route('@video', { url: playurl }))
            } else {
              $ui.toast('主播未开播或链接错误')
              //   this.finish()
            }
          } else {
            $ui.toast('链接不正确')
            //     this.finish()
          }
        }
      }
    }
  ],
  async fetch({ args, page }) {
    let url = 'https://m.yizhibo.com/www/live/visitor_hot_list'
    let res = await $http.get(url)
    let items = []
    let list = res.data.data.list
   
    list.map(list => {
     // console.log(list)
      items.push({
        title: list.title,
        style: 'live',
        image: list.cover,
        viewerCount: list.views,
        label: list.ytypename,
        author: {
          name: list.nickname
        },
        summary: list.desc,
        route: $route('@video', {
          url: list.playurl
        }) 
      })
    })

    return items
  }
}
