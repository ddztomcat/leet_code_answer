const fs = require('fs')

fs.readFile('./default.md', 'utf8', function(err, str) {
  if(err) throw err
  let arr = str.split('\n').filter(item => ~item.indexOf('####'))
  let data = '|题目|链接|\n|---|---|\n'
  arr.forEach(item => {
    let t = item.split(' ')
    data += `|${t[1]}|[地址](#${t[1]})|\n`
  })
  data += str
  fs.writeFile('README.md', data, function(err) {
    if(err) throw err
    console.log('写完了')
  })
  console.log(arr)
})