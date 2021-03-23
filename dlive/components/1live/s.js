module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let items = []
    let data = `key=${encodeURI(args.keyword)}&page=${page || 1}&limit=20`
  
    let url =
      'https://www.yizhibo.com/member/so_h5api/search_member?p_from=Phome_search'
    let res = await $http.post(url, data)
    res.data.data.list.map(list => {
      list = list
      title = list.nickname
      summary = list.ytypename
      image = list.avatar
      scid = list.scid || list.memberid
      if (list.scid && args.online == 1) {
        item()
      }
       else if (!list.scid &&args.online == '0') {     
        item()
      }
    })
    return {
      items: items,
      nextPage: (page || 1) + 1
    }
    function item() {
      items.push({
        title: title,
        style: 'list',
        summary: summary,
        image: image,
        route: $route('@video', {
          url: `http://alcdn.f01.xiaoka.tv/live/${scid}.flv`
        })
      })
    }
  }
}
