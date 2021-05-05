module.exports = {
  type: 'bottomTab',
  searchRoute: $route('specialist'),
  async fetch({ args }) {
      let items = [
      {
        title: '首页',
        image: $icon('home', 'black'),
        route: $route('home')
      },{
        title: '频道',
        image: $icon('dashboard', 'black'),
        route: $route('special')
      },
      {
        title: '热点',
        image: $icon('thumb_up', 'black'),
        route: $route('hotab')
      }
    ]

    return { items: items }
  }
}
