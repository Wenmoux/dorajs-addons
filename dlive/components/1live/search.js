module.exports = {
  type: 'topTab',
  tabMode: 'fixed',
  async fetch({ args }) {
    return [
      {
        title: '直播中',
        route: $route('1live/s',{keyword:args.keyword,online:'1'}),
        image: $icon('home', 'black')
      },
      {
        title: '未开播',
        route: $route('1live/s',{keyword:args.keyword,online:'0'}),
        image: $icon('stars', 'black')
      }
    ]
  }
}
