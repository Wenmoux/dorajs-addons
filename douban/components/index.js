module.exports = {
  type: 'bottomTab',
  tabMode: 'fixed',
  searchRoute: $route('list'),
  fetch() {
    return [
      {
        image: $icon('movie_filter', 'black'),
        title: '片库',
        route: $route('top')
      },
      {
        image: $icon('question_answer', 'black'),
        title: '影评',
        route: $route('yingping')
      }
    ]
  },
  onClick(item) {
    $ui.toast(`Clicked ${item.title}`)
  }
}
