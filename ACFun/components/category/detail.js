module.exports = {
    type: 'list',
    async fetch({
        args,
        page
    }) {
        let items = []
        const header = {
            headers: {
                "deviceType": "5",
                "market": "appstore",
                "appVersion": "6.24.0"
            }
        }
        if ((page || 1) == 1) {
            items.push({
                title: "最新",
                style: "label",
                spanCount: 6,
                onClick: async () => {
                    this.sort = `1&range=604800000`
                    // this.nextPage=0
                    this.refresh()
                }
            }, {
                title: "最热",
                style: "label",
                spanCount: 6,
                onClick: async () => {
                    this.sort = 0
                    //  this.nextPage=0
                    this.refresh()
                }
            })
        }
        let url = `https://apipc.app.acfun.cn/searches/channel?app_version=6.24.0&channelIds=${args.id}&market=appstore&origin=ios&pageNo=${page||1}&pageSize=20&product=ACFUN_APP&resolution=2048x1536&sort=${this.sort?this.sort:"0"}&sys_name=ios&sys_version=13.5`
        let res = await $http.get(url, header)

        res.data.data.list.map(data => {

            items.push({
                title: data.title,
                style: 'live',
                author: {
                    name: data.user.username,
                    avatar: data.user.userImg
                },
                viewerCount: data.views,
                image: data.cover,
                summary: data.description,
                onLongClick: async () => {
                    id = data.user.userId
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
                route: $route('video', {
                    id: data.contentId,
                    type: 1
                })
            })
        })
        return {
            items: items,
            nextPage: (page || 1) + 1
        }
    }
}