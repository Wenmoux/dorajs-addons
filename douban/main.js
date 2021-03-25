if (typeof $dora == 'undefined') {
  console.error('This project runs only in Dora.js.')
  console.error('Please visit https://dorajs.com/ for more information.')
  process.exit(-1)
}module.exports = {
  config:{headers:{
    "cookie":"bid=cWckZpE5NI0; ll=118377",
    "referer":"https://m.douban.com",
   "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
   "Host":"movie.douban.com" }}
}


console.info('Congratulation, your addon runs successfully!')
const oldConsoleLog = console.log;
  global.console.log = function (msg) {
  
    // 忽略 pnp 日志
    
    if (msg === 'dependencyNameMatch') {
      return;
    }
    if (typeof msg === 'object') {
      if (msg.issuer && msg.dependencyNameMatch) {
        return;
      }
      if (
        msg.issuerInformation ||
        msg.issuerLocator ||
        msg.dependencyName ||
        msg.dependencyReference
      ) {
        return;
      }
    }
    oldConsoleLog.apply(oldConsoleLog, arguments);
  };