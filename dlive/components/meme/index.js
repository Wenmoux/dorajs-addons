module.exports = {
  type: 'topTab',
  tabMode: 'fixed',
  async fetch({ args}) {
    return [
      {
        title: '最新',
        route: $route('meme/list', { id: 'new' })
      },
      {
        title: '特色',
        route: $route('meme/list')
      },
      {
        title: '新人',
        route: $route('meme/list', {
          url:
            'https://api.memeyule.com/public/room_list?live_type=0&filter=1&size=24&live=true&page=1'
        })
      }
    ]
  }
}
