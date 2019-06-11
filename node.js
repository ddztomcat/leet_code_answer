const fs = require('fs')

fs.readFile('./default.md', 'utf8', function(err, str) {
  if(err) throw err
  let arr = str.split('\n').filter(item => ~item.indexOf('####'))
  let data = '|题目|链接|题目|链接|\n|---|---|---|---|\n'
  let i = 0, len = arr.length
  for(; i + 2 <= len; i += 2) {
    let t = arr[i].split(' ').map(item => item.replace(/\s/g,''))
    let p = arr[i + 1].split(' ').map(item => item.replace(/\s/g,''))
    if(i === 0) console.log(t, p)
    data += `|${t[1]}|[地址](#${t[1]})|${p[1]}|[地址](#${p[1]})|\n`
  }
  for(; i < len; i++) {
    let t = arr[i].split(' ')
    data += `|${t[1]}|[地址](#${t[1]})|-|-|\n`
  }
  console.log(len)
  data += str
  fs.writeFile('README.md', data, function(err) {
    if(err) throw err
    console.log('写完了')
  })
})