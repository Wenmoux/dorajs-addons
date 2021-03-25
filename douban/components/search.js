//懒得改了 电影天堂先扔着吧
module.exports = {
  type: 'list',
  async fetch({ args, page }) {    
  let items = [{}]
  const cheerio = require("cheerio")
  url = (await $http.get("https://cdn.jsdelivr.net/gh/Wenmoux/sources/other/dbzy.json")).data

$http.defaults.timeout = 3000;
    //电影天堂
    url2 = `http://api.skyrj.com:80/Api2/Dy/GetPageList?SearchKey=${encodeURI(
      args.keyword
    )}&pageSize=10&pageIndex=1`
    let res2 = await $http.get(url2)
    
   
    res2.data.map(data => {
      let title = data.Name + '    ' + data.MovieTitle
      let url = `http://api.skyrj.com:80/Api2/Dy/GetVideoInfo?Id=${data.ID}`
      add(url, title, '电影天堂', 'dytt')
    })
    
    
    
  function search(u,n) {
    return new Promise(async resolve => {
        try {
          
    let res = await $http.get(u+`?ac=list&wd=${encodeURI(args.keyword)}&pg=1`)
 
    const $ = cheerio.load(res.data)
    let list = $("list>video") 
    
  //  console.log(res.data)     
      list.each((index, li) => {
        let title = $("name",li).html().match(/\[CDATA\[(.+?)]/)[1]
   let summary=$("note",li).html().match(/\[CDATA\[(.+?)]/)[1]
    let id = $("id",li).text()
    add(u, title+"  "+summary, n, id)
           
      })
      
      
            
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}
for (i of url){
  console.log(i.name)
await search(i.baseUrl,i.name)
}
    
      
    
    
    
    
    
    
   
      items[0]={
      title:`共${items.length-1}个搜索结果`,
      style:"category"
    }
   
//await feifei("http://www.zdziyuan.com/inc/feifei3.4/",0)
 //console.log(sitems)
    return items
    function add(url, title, source, id) {
      items.push({
        link: url,
        style: 'list',
        title: title ,
        summary:source,
        route: $route('player', {
          url: url,
          id: id
        })
      })
    }
    
    
  }
}
