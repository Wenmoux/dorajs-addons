module.exports = {
  type: 'topTab',

  searchRoute: $route('specialdetail'),
  async fetch({ args }) {
      let items = [
      {
        title: '推荐',
        image: $icon('home', 'black'),
        route: $route('specialist',{type:"recommend"})
      },{
        title: '热点',
        image: $icon('favorite', 'black'),
        route: $route('specialist', {
          type:"hot"
          
          }
        )
      },
      {
        title: '最新',
        image: $icon('favorite', 'black'),
        route: $route('specialist', {
          type: 'latest'
        })
      }
    ]

    return { items: items }
  }
}
