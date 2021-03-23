module.exports = {
    type: 'topTab',
    async fetch({
        args,
        page
    }) {
        items = []
        tag = ['香蕉榜-banana-', '全站-channel-0', '番剧-channel-155', '动画-channel-1', '生活-channel-201', '娱乐-channel-60', '游戏-channel-59', '舞蹈•偶像-channel-123', '音乐-channel-58', '科技-channel-70', '影视-channel-68', '体育-channel-69', '鱼塘-channel-125']
        tag.map(data => {
            data = data.split('-')
            items.push({
                title: data[0],
                style: 'simple',
                route: $route('home/rank', {
                    rid: data[1],
                    id: data[2]
                })
            })
        })
        return items
    }
}