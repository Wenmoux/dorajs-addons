const load=require("cheerio").load
module.exports = {
  type: 'video',
  async fetch({ args, page }) {
    let url =`https://8xnqve.xyz${args.url}`
    console.log(`>>>详情页地址：${url}`)
    let res = await $http.get(url)
    const $ = load(res.data) 
    this.url=`https://8x1ae3.com/v/${$("#vpath").text()}` 
    console.log(`>>>播放地址：${this.url}`)
  }
}
