module.exports = {
    type: 'list',
    async fetch({
        args,
        page
    }) {
        let url = "https://api-new.acfunchina.com/rest/app/selection?market=appstore&app_version=6.24.0.388&product=ACFUN_APP&origin=ios&mkey=AAHewK3eIAAyMjAwNzM1NTMBAhAAMEP1uwSXnjpqYAAAAJMmyDhXfr4UHzrdgw5h%0D%0Ag-Tgnn9h4r63X9eiAN7WpyfhBQX95IrtiAGzhf-o4P-gmcgPtJ0izmd26BuNCQZg%0D%0A5kHIEXDGL17EZCRUVxdMgZAxEJwgjb1cCx2vkWl5kYjElw%3D%3D&sys_name=ios&egid=DFPC0D9972AB4AEF0F57FAD8437DBC6CAD35548B567E77BB25A061A74D89D3A2&sys_version=13.5&resolution=2048x1536&ftt="
        let items = []
        let res = await $http.post(url, "", appheader)
        let list = res.data.vdata
        list.splice(0, 1)
        list.map(data => {
            //  route=null
            items.push({
                title: data.title,
                style: "category",
                // route:$route(route),
                action: {
                    title: ""
                }
            })

            data.bodyContents.map(data => {
                if (data.detail) {   
                    items.push({
                        title: data.title,
                        image: data.img,
                        viewerCount: data.detail.displayPlayCount ? data.detail.displayPlayCount : data.detail.viewCount,
                        label: data.detail.playDuration,
                        style: "live",
                        author: {
                            name: data.user ? data.user.name : null,
                            avatar: data.user ? data.user.headUrls : null
                        },
                        onLongClick: async () => {
                            id = data.detail.user.id
                            let info = `toUserId=${id}&action=1&groupId=0`
                            let url = `https://www.acfun.cn/rest/pc-direct/relation/follow`

                            let res = await $http.post(url, info, {
                                headers: {
                                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.111 Safari/537.36",
                                    "cookie":$prefs.get("acookie"),
                                      "Referer": `https://www.acfun.cn/v/ac${id}`
                                }
                            })
                            if (res.data.result == '0') {
                                $ui.toast('关注成功')
                            } else {
                                console.log(res.data)
                            }
                        },
                        route: $route("video", {
                            "list": JSON.parse(data.detail.currentVideoInfo.ksPlayJson).adaptationSet.representation,
                            "type": 1,
                            id: data.detail.contentId,
                            "vid": data.detail.videoId
                        })

                    })
                }
            })
        })

        return items
    }
}