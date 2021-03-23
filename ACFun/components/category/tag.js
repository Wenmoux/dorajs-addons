module.exports = {
  type: 'topTab',
  async fetch({ args, page }) {
    items=[]
        args.list.map(data => {
            items.push({
                title: data.name,
                style: 'simple',
                route: $route('category/detail', {
                  id: data.id,
                })
            })                       
        })
        return items
  }
}
