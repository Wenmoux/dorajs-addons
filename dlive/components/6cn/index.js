module.exports = {
  type: 'topTab',
  tabMode: 'fixed',
  async fetch({ args}) {
    return [
      {
        title: '推荐',
        //http://v.6.cn/coop/mobile/index.php?padapi=coop-mobile-guessyoulike.php&av=3.0&encpass=&logiuid=&p=1&size=99999
        route: $route('6cn/list', { id: 'coop-mobile-guessyoulike.php' })
      },
      {
        title: '热门',
        //http://v.6.cn/coop/mobile/index.php?padapi=coop-mobile-getlivelistnew.php&av=3.0&encpass=&logiuid=&type=&recid=&reft=5004
        route: $route('6cn/list',{type:'',id:'coop-mobile-getlivelistnew.php'})
      },
      {
        title: '舞蹈',
        //http://v.6.cn/coop/mobile/index.php?padapi=coop-mobile-getlivelistnew.php&av=3.0&encpass=&logiuid=&type=u1&recid=T1589970870140-0&reft=5004
        route: $route('6cn/list', {
          type:'u1',
          id:'coop-mobile-getlivelistnew.php'
        })
      },
         {
        title: '好声音',
        //http://v.6.cn/coop/mobile/index.php?padapi=coop-mobile-getlivelistnew.php&av=3.0&encpass=&logiuid=&type=
        
       // &reft=5004
        route: $route('6cn/list', {
          type:'u0&recid=T15899708547509-0',
          id:'coop-mobile-getlivelistnew.php'
        })
      },
      {
        title: '脱口秀',
        //http://v.6.cn/coop/mobile/index.php?padapi=coop-mobile-getlivelistnew.php&av=3.0&encpass=&logiuid=&type=
        
      //  &reft=5004
        route: $route('6cn/list', {
          key:'u2',
          type:'u2&recid=T1589970925998-0',
          id:'coop-mobile-getlivelistnew.php'
        })
      }
      
    ]
  }
}
