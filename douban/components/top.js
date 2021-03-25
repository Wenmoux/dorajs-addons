module.exports = {
  type: 'topTab',
  tabMode: 'fixed',
  searchRoute: $route('list'),
  fetch() {
    return [
      {
        image: $icon('personal_video', 'black'),
        title: '电视剧',
        route: $route('list', { sort: '电视剧',key:"tv"})
      },
      {
        image: $icon('movie', 'black'),
        title: '电影',
        route: $route('list', { sort: '电影',key:"movie" })
      },
      {
        image: $icon('music_video', 'black'),
        title: '综艺',
        route: $route('list', { sort: '综艺',key:"tv" })
      },
      {
        image: $icon('toys', 'black'),
        title: '动漫',
        route: $route('list', { sort: '动漫',key:"tv" })
      },{
        image: $icon('live_tv', 'black'),
        title: '纪录片',
        route: $route('list', { sort: '纪录片',key:"movie" })
      }/*,
      {
        image: $icon('live_tv', 'black'),
        title: '音乐',
        route: $route('list', { sort: '音乐',key:"music" })
      }*/
    ]
  },
  onClick(item) {
    $ui.toast(`Clicked ${item.title}`)
  }
}
