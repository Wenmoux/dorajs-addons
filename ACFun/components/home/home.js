module.exports = {
    type: 'bottomTab',
    tabMode: "fixed",
    async fetch() {
        return [{
                title: "首页",
                route: $route("home/h"),
                image: $icon('home', 'black')
            },
            {
                title: "直播",
                route: $route("live/zbcata"),
                image: $icon('videocam', 'black')
            },
           {
                title: "番剧",
                route: $route("bangumi/bangumi"),
                image: ("http://imgs.aixifan.com/cms/2017_01_13/1484282235201.png")
            },{
                title: "我的",
                route: $route("me/MeTab"),
                image: $icon('grade', 'black')
            }
        ]

    }
}