module.exports = {
    type: 'topTab',
    tabMode: "fixed",
    searchRoute: $route('list'),
    async fetch() {
        return [{
                title: "全部",
                route: $route("live/list", {
                    "type": 0
                })
            },
            {
                title: "游戏",
                route: $route("live/list", {
                    "type": 1
                })
            },
            {
                title: "手游",
                route: $route("live/list", {
                    "type": 2
                })
            },
            {
                title: "娱乐",
                route: $route("live/list", {
                    "type": 3
                })
            },
            {
                title: "虚拟偶像",
                route: $route("live/list", {
                    "type": 4
                })
            }
        ]

    }
}