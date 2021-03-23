module.exports = {
  type: 'bottomTab',
  async fetch({ args, page }) {
    return [
      {
        style: 'icon',
        title: '首页',
        image:$icon('home', 'black'),
        route:$route('1live/1live')
      },
      {
        style: 'icon',
        title: '平台',
        image:$icon('dashboard', 'black'),
        route:$route('pd')
      }/*,
        {
        style: 'icon',
        title: '关注',
        image:$icon('favorite_border', 'black'),
       route:$route('pd')
      }*/
    ]
  }
}
