const load=require("cheerio").load
module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let items=[]
   if(!args.keyword){
    let url=`https://8xnqve.xyz/html/category/video/video${args.type}/page_${page||1}.html`
     let res = await $http.get(url)
    const $ = load(res.data)
    let list = $("div>ul:nth-child(3)>li:not(li[id])")      
      list.each((index, li) => {
       items.push(
      {
        image:$(".lm_lbimg>a>img",li).attr("src"),
        title :$("p>a",li).text().trim(),
        route:$route("detail",{url:$("a",li).attr("href")}),
        style:"live",
        spanCount:6
      }                
      )     
      })}else{  
      this.title=args.keyword +'の🔎结果'  
     let url='https://8xroem.com/search'
     let data = `title=${encodeURI(args.keyword)}&current=${page||1}&size=50&source=v1` 
     let res = await $http.post(url,data)  
      items= res.data.data.map(a => {
      url=a.pageUrl
      return {
        title: a.videoTitle,
        style: 'live', 
        image:'https://8x2um.xyz:1443'+a.videoImgUrl,
        route: $route("detail",{url})
      }
    })  
      }
      return {
        items:items,
       nextPage:(page||1)+1
      }    
  }
}
