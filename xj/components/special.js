module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    
item=[]
res= await $http.get(`${baseurl_xj}/special/listing-0-0-${page||1}`)
    rows=res.data.data.rows
  rows.map(data=> { 
        item.push({
        title:data.spname,
        style:"category",
        
        route:$route("specialist",{spid:data.spid}),
        action: {
                    title: data.itemcount+"部",
                    route:$route("specialist",{spid:data.spid})
                }
      })
      data.vodrows.map(data=> {        
        item.push({
          title:data.title,
          image:data.coverpic,
          style:"live",
          label:data.tags[0]?data.tags[0].tagname:"",
          viewerCount:data.playcount_total,
          route:$route("detail",{id:data.vodid})                  
        })               
      })
    })    

    return {
      items:item,
     nextPage:(page||1)+1    
    }
  }
}
