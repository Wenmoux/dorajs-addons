
module.exports = {
  type: 'webview',
  uiOptions: {
    toolBar: true,
    statusBar: true
  },
  fetch() {
    return {
      url: 'https://www.acfun.cn/member/#area=splash'
    }
  },
  created() {
    this.actions = [
      {
        title: '获取cookies',
        onClick: () => {
          $prefs.set(
            'acookie',
            JSON.stringify(this.cookies)
              .replace(/,/g, ';')
              .replace('}', '')
              .replace('{', '')
              .replace(/\"/g, '')
              .replace(/:/g, '=')+";FM_SESS.sig=WwYAhnMuUww-lkuKoEqHQgMsNsY;FM_SESS=20200421|51vmoxjzfrzetthbqme3no3at;"
          )
          $ui.toast(JSON.stringify(this.cookies))
        }
      }
    ]
  },
  onPageFinished(url) {
    $ui.toast("登录成功后记得殿下上边的getcookieS再返回哦！！如果没出现的话关掉插件重进再试试（｡ò ∀ ó｡）")
    console.log(`onPageFinished: ${url}`)
  }
}
