module.exports = {
  type: 'topTab',
  tabMode: 'fixed',
  searchRoute: $route('list'),
  fetch({args}) {
    return [
      {
        image: $icon('insert_drive_file', 'black'),
        title: '短评',
        route: $route('comment',{id:args.id,key:args.key})
      },
      {
        image: $icon('question_answer', 'black'),
        title: '影评',
        route: $route('commenty',{id:args.id,key:args.key})
      }
    ]
  },
  onClick(item) {
    $ui.toast(`Clicked ${item.title}`)
  }
}
