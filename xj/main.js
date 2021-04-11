if (typeof $dora == 'undefined') {
  console.error('This project runs only in Dora.js.')
  console.error('Please visit https://dorajs.com/ for more information.')
  process.exit(-1)
}

console.info('Congratulation, your addon runs successfully!')
global.baseurl_xj=$prefs.get("baseurl_xj")