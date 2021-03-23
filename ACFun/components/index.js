  const header = {
            headers: {
               "deviceType": "5",
                "market": "appstore",
                "appVersion": "6.24.0",
                "resolution": "2048x1536",
                "acPlatform": "IPAD"
             }
        }
module.exports = {
    type: 'drawer',
    searchRoute: $route("search"),
    async fetch({
        args,
        page
    }) {
        items = [{
            title: "首页",
            route: $route("home/home"),
            image: $icon('home', 'black')
        }, {
                title: "排行榜",
                route: $route("home/ranklist"),
                image: $icon('thumb_up', 'red')
            }]        
        let url = "https://apipc.app.acfun.cn/v2/channels/allChannels"
        let res = await $http.get(url, header)
        vdata = []
        res.data.vdata.map(data => {
            items.push({
                title: data.name,
                style: 'simple',
                image:data.img,
                route: $route('category/tag', {
                    list: data.childChannels
                })
            })

        })
        return items
    }
}