module.exports = {
  type: 'topTab',
  async fetch({ args, page }) {
    return [
     {
        style: 'simple',
        title: '我关注的',        
        route: $route("me/Me")
      }, {
        style: 'simple',
        title: '内容推送',
        route: $route("me/new")
      }
      
    ]
  }
}
