module.exports = {
  type: 'list',
  async fetch({ args, page }) {
      let items =[]   
      const cheerio = require("cheerio")
 this.allowBookmark = true
    //电影天堂
    if (args.id=="dytt"){
      let resp=  await $http.get(`${args.url}`)
      
      
        let list = resp.data.MoviePlayUrls
        let items = list.map(data => {
        let title= data.Name
        let url=data.PlayUrl
        add(url, title)
        })}
        else 
        {
          await vodlist(args.id,args.url)
        }
      
      function vodlist(id,u) {
    return new Promise(async resolve => {
        try {
          
         url=`${u}?ac=videolist&ids=${id}`
         console.log(url)
         let res= await $http.get(url)
      console.log(res)
         const $ = cheerio.load(res.data)
     
    list= $("dl>dd") .html().match(/\[CDATA\[(.+?)]]/)[1].split("#")
 
      let items = list.map(data => {
        data=data.split("$")
        let title= data[0]
        let url=data[1]
        add(url, title)
        })
      
      
            
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}
 

    function add(url, title) {
      items.push({
        style: 'list',
        spanCount:3,
        title: title,
        route: $route('@video', {
          url: url
        })
      })
    return items
    }
    return items
  }
}
