module.exports = {
  async fetch({ page, args }) {
    try {
    if ((args.keyword != '') & (args.keyword != undefined)) {
      url = `https://movie.douban.com/j/subject_suggest?q=
      ${encodeURI(args.keyword)}`
    } else {
      url = `https://movie.douban.com/j/new_search_subjects?range=0,10&sort=U&tags=${encodeURI(args.sort)}&year_range=&start=${page||0}`
    }
  //  console.log(url)
    let resp = await $http.get(url,config)
   //console.log(resp.data)
    let list =resp.data.data||resp.data
    let items = list.map(data=> {
     // console.log(data)
      return{
        style: 'vod',
        image: data.cover||data.img,
        title: data.title,
        label:data.rate||data.year,
        summary:`导演:${data.directors}\n演员:${data.casts}`,
        route: $route('detailtab', {
          keyword: data.title,
          url:encodeURI(data.url),
          id:data.id,
          key:args.key||data.type
        })
      }
    })
    return {
      nextPage:args.keyword?null:(page+ 20),
      items: items
    }
} catch (e) {
    console.log(e)
} 
  }
}
