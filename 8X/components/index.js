module.exports = {
  type: 'topTab',
  tabMode:"fixed",
  searchRoute: $route('list'),
  async fetch() {    
    return [
    {'route':'1','title':'大陆'}, 
    {'route':2,'title':'日韩'}, 
    {'route':3,'title':'欧美'},
    {'route':4,'title':'动画'},
    {'route':5,'title':'三级'}
    ].map(a => {
      type=a.route
      return {
        title: a.title,
        route: $route("list",{type})
      }
    })
  }
}
