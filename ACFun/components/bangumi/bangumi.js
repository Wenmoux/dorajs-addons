module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let items=[]
    /*
    
    {
  related_bangumis: [],
  sidelights: [],
  recommendBangumis: [],
  hotTags: [],
  groupId: 'b53cbd870043499e935615698c9c4598_1&-124&&bs',
  coverImageH: 'https://tx-free-imgs.acfun.cn/XUqbQ0fdSo-3e267v-UzaAbi-yANbuq-q2IVvq.png?imageslim',
  area: 1,
  shareUrl: 'https://www.acfun.cn/bangumi/aa6000991',
  likeCount: 2753,
  isLike: false,
  commentCountShow: '3002',
  shareCountShow: '4864',
  stowCountShow: '10.8万',
  price: 0,
  commentCount: 3002,
  shareCount: 4864,
  playCount: 8610121,
  recoReason: '让宅男去运动的力量',
  acfunOnly: true,
  paymentType: { value: 0, name: '免费' },
  areaShow: '日本',
  playCountShow: '861.0万',
  firstPlayDate: 1514995200000,
  updateWeekDay: 4,
  updateDayTime: -28800000,
  webUpdateInfoShow: '',
  updateInfoShow: '',
  title: '摇曳露营△',
  stowCount: 108203,
  coverImageV: 'https://tx-free-imgs.acfun.cn/H9PSY5pKgK-mEBJFb-QbIZ3m-uqYzyq-AfAB3y.png?imageslim',
  intro: '这是，某个冬日的故事。\n' +
    '从静冈搬家到山梨的女高中生·抚子，为了观赏“在千圆纸币上都有图案的富士山”而骑着自行车来到本栖湖，但不巧天气是阴天。没能看到富士山，十分疲倦的抚子当场进入了梦乡。当她醒来的时候，时间已是深夜。在这初来乍到的地方，连回去的路都不知道。拯救了不安而害怕的抚子的是，一位爱好露营的女孩子·凛。为了让寒冷的身体取暖而点燃篝火的两人。一边啜着咖喱面一边对话的抚子和凛。终于，两人期盼已久的瞬间到来。\n' +
    '“看到了……富士山……”\n' +
    '抚子与凛，从这两人的相遇开始的户外系girls story。',
  id: 6000991,
  updateStatus: 0,
  allowComment: true,
  allowDownload: false,
  onlineTime: 1577758998000,
  lastUpdateItemTimeStr: '19年12月更新',
  lastVideoId: 11137880,
  updateDayTimeStr: '00:00',
  lastUpdateItemName: '第12话',
  commentParted: true,
  bangumiStyleList: [],
  online: 1,
  isFavorite: false,
  itemCount: 12
    
    */
      if (!page) {
      items.push(
        {
          title: '最多追番',
          style: 'list',
          spanCount: 4,
        onClick: async () => {
            this.order=10    
            this.refresh()
            this.nextPage = 0
          }
        },
        { title: '最近更新', style: 'list', spanCount: 4 ,
         onClick(){
            this.order=11         
            this.refresh()
            this.nextPage = 0
          }
          
          },
          {title:"搜索",
          spanCount:4 ,
        //  image:$icon('search', 'black'),
                  onClick: async () => {
              let keyword = await $input.prompt({
                title: '搜索',
                hint: 'Input your keyword',
                value: ''
              })
              if (keyword) {
                $router.to($route("search",{keyword:keyword,type:"bangumi"}))
              }
              else
              {$ui.toast("你要搜撒子哦")
              }                            
            }         
          }
      )
    }
    let url =`https://api-new.app.acfun.cn/rest/app/lite/new-bangumi/index?entries=${this.order?this.order:11}&entries=20&entries=30&entries=805306368&entries=40&entries=50&pageSize=30&pageNo=${page||1}&app_version=1.11.0.144&market=sm_xiaomi&sys_name=android&appMode=1&socName=%3A%20Qualcomm%20MSM8917&boardPlatform=msm8937&sys_version=6.0.1&product=ACFUN_APP.LITE`
   let data ="bangumiId=6002684&pageSize=1000&pageNo=1&mkey=AAHewK3eIAAyMTk3Mzg1MTkAAhAAZYCufARsmh_bYAAAAEMyjy_mir2MdGSK9LGejY3U1N3M4XZrpYqti7rf-VDHXIaDt7AfmxP3WmlbFUIFZUEed_wnBIzY7Sn6n7l-utn9OiqHyrRGJwE6-AekFoLQMYEZnFi7iHZC3lSkbwAePw%3D%3D"
   let res = await $http.get(url)
   
   res.data.bangumis.map(list => {
      items.push({
        title: list.title,
        style: 'vod',
        label:list.areaShow,
        image:list.coverImageH,
        viewerCount:list.playCount,
        summary:list.lastUpdateItemName+ list.lastUpdateItemTimeStr,
        route: $route('bangumi/episode', {
          id: list.id
        })
      })
    })
    return {
      items:items,
      nextPage:(page||1)+1
    }
  }
}
