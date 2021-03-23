module.exports = {
    type: 'list',    
    async fetch({
        args,
        page
    }) {
        let url = `https://live.acfun.cn/api/channel/list?count=56&pcursor=${page||0}&filters=[%7B%22filterType%22:1,+%22filterId%22:${args.type}%7D]`
        let res = await $http.get(url)
        let items = []
        res.data.channelListData.liveList.map(data => {
            items.push({
                title: data.title,
              image: data.coverUrls[0],
                viewerCount: data.onlineCount,
                label: data.type.name,
                style: "live",
                author: {
                    name: data.user.name,
                   avatar: data.user.headUrl
                },
                route: $route("video", {
                    id: data.authorId
                })

            })
        })
        console.log(items)
        return {
            items: items,
            nextPage: (page || 1) + 1
        }
    }
}