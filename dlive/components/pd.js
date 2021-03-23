module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    return [
      {
        style: 'icon',
        title: '一直播',
        image:'https://static.yizhibo.com/v2/h5/share/icons/apple-touch-icon-152x152.png',
       route:$route('1live/1live')
      },
      {
        style: 'icon',
        title: '么么直播',
        route:$route('meme/index'),
        image:'https://app.sumeme.com/2339/m/static/base/styles/images/logo_97e03e8.png',
      },
 
      {
        style: 'icon',
        title: '六间房',
        image:'http://vr0.6rooms.com/v/d3/8746b065fc1d40d19144b38809698e46.png',
            route:$route('6cn/index')
      },
      {
        style: 'icon',
        title: '95直播',
        image:'http://vr0.6rooms.com/v/d3/8746b065fc1d40d19144b38809698e46.png',
            route:$route('95/index')
      }
    ]
  }
}
