module.exports = {
  type: 'bottomTab',
  tabMode: 'fixed',
  searchRoute: $route('list'),
  fetch({args}) {
    return [
      {
        image: $icon('insert_drive_file', 'black'),
        title: '详情',
        route: $route('detail',{keyword: args.keyword,
          url:args.url,id:args.id,key:args.key})
      },
      {
        image: $icon('question_answer', 'black'),
        title: '短评',
        route: $route('commentab',{id:args.id,key:args.key})
      }
    ]
  },
  onClick(item) {
    $ui.toast(`Clicked ${item.title}`)
  }
}
