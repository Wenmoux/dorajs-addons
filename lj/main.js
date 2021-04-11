if (typeof $dora == 'undefined') {
  console.error('This project runs only in Dora.js.')
  console.error('Please visit https://dorajs.com/ for more information.')
  process.exit(-1)
}
/*if(!$prefs.get("token")){
  console.log("666")
}*/

console.info('Congratulation, your addon runs successfully!')
global.baseapi="http://jk.5apk.cn/api"
global.headers={headers:{token:"MTAxMzQ5NyYxNjE1MjgzMjI2JjE2MTUzNjk2MjYmNWYzNTQzOGFkYWUwZmZkYjQwZTI1NTZmZmVmZGZiZDE%3D"}}