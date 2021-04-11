module.exports = {
  type: 'topTab',
  searchRoute: $route('list1'),
  async fetch({
    args,
    page
  }) {
    let res = await $http.post(`${baseapi}/base`)
    let items = []    
     list =res.data.data.class
   list.splice(1,).map(list => {     
      items.push({
        title: list.name,        
        route: $route('list', {
          data: list.children,
          id:list.id
        })
      })
    })         
    return items
  }
}