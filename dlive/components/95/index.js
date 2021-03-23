module.exports = {
  type: 'topTab',
  tabMode: 'fixed',
  async fetch({ args}) {
    let str = ["推荐-21","热门-9","全球-24","连麦-20","女神-1","才艺-18","新星-11","手机-15","玩乐-16","畅聊-22"]
    
    let items = str.map(a => {
     a=a.split("-")
      return {
        title: a[0],
        type: 'list', 
        route: $route('95/list',{id:a[1]})
      }
    })
    return {
      items: items

  }
  
  }
}
