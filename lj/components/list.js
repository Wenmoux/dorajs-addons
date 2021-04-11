module.exports = {
  type: 'list',
  async fetch({
    args,
    page
  }) {    
    let items = [] 
    if((page||1)==1){
    let res = await $http.post(`${baseapi}/base`)        
     list =res.data.data.class
   args.data.map(list => {     
      items.push({
        title: list.name, 
        style:"label",       
        route: $route('list1', {
          id: list.id
        })
      })                      
   } )
   }
   let res2 =await $http.post(`${baseapi}/homeList`,{"id":args.id,"type":"last","page":(page||1)+1},headers)
      res2.data.data.map(list => {     
      items.push({
        title: list.video_name, 
        style:"list",       
        route: $route('videodetail', {
          uuid: list.uuid
        })
      })      
      })                   
    return {
      items,
      nextPage:(page||1)+1      
    }
  }
}