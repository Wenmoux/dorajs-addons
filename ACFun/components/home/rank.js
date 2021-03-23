module.exports = {
    type: 'list',
    async fetch({
        args,
        page
    }) {
        let items = [{
                title: "日榜",
                style: "label",
                spanCount: 6,
                onClick: async () => {
                    this.id = "DAY"
                    this.refresh()
                }
            },
            {
                title: "周榜",
                style: "label",
                spanCount: 6,
                onClick: async () => {
                    this.id = "WEEK"
                    this.refresh()
                }
            }
        ]
        let url = `https://api-new.acfunchina.com/rest/app/rank/${args.rid}?market=appstore&app_version=6.24.0.388&product=ACFUN_APP&origin=ios&mkey=AAHewK3eIAAyMjAwNzUwNzcBAhAAMEP1uwQ5saHhYAAAAFVuZgWY5bDkTSMqgBqm%0D%0Am4rgnn9h4r63X9eiAN7WpyfhBQX95IrtiAGzhf-o4P-gmcgPtJ0izmd26BuNCQZg%0D%0A5kHIEXDGL17EZCRUVxdMgZAxEJwgjb1cCx2vkWl5kYjElw%3D%3D&sys_name=ios&egid=DFPC0D9972AB4AEF0F57FAD8437DBC6CAD35548B567E77BB25A061A74D89D3A2&sys_version=13.5&resolution=2048x1536&ftt=`
        let res = await $http.post(url, `rankPeriod=${this.id?this.id:"DAY"}&channelId=${args.id}`, appheader)       
        res.data.rankList.map(data => {
            items.push({
                title: data.contentTitle,
                image: data.videoCover,
                viewerCount: data.viewCountShow,
                label: data.channelName,
                style: "live",
                author: {
                    name: data.userName,
                    avatar: data.userImg
                },
                onLongClick: async () => {
                    id = data.userId
                    let info = `toUserId=${id}&action=1&groupId=0`
                    let url = `https://www.acfun.cn/rest/pc-direct/relation/follow`
                    console.log(data)
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
                    "id": data.dougaId,
                    "type": 1,
                    "vid": data.videoList[0].id
                })
            })
        })
        return items
    }
}