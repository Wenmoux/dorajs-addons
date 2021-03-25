module.exports = {
  type: 'article',
    async fetch({args}) {
    url=args.type?`https://m.douban.com/rexxar/api/v2/review/${args.id}?for_mobile=1`:args.url      
const resp = await $http.get(url,{headers:{"referer":"https://m.douban.com"}})
content=resp.data.content?resp.data.content:resp.data
    return {
      content: {
        markdown: content,
        charset: 'utf-8'
      },
    }
  }
}
