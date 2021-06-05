const $siteList = $('.siteList')
const $LastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
// 把获取到的字符串x再变成 对象
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:'A',url:'https://www.acfun.cn/'},
    {logo:'B',url:'https://www.bilibili.com/'},
]

const simplifyUrl = (url)=>{
  return url.replace('https://','')
  .replace('http://','')
  .replace('www.','')
  .replace('.cn','')
  .replace('.com','')
  .replace(/\/.*/,'')   //正则表达式（删除/开头的内容）
}

const render = ()=>{
  //找到全部li,唯独不要最后一个li（也就是新增）删掉
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node,index)=>{
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li> `).insertBefore($LastLi)
    $li.on('click',()=>{
      window.open(node.url)
    })
    $li.on('click','.close',(e)=>{
      e.stopPropagation()//阻止冒泡
      hashMap.splice(index,1)
      render()
    })
})
}

render()

$('.addButton')
.on('click',()=>{
    let url = window.prompt('输入需要添加的网址')
    if(url.indexOf('http')!==0){
        url = 'https://' + url
    }
    
    hashMap.push(
      // logo取删除后的第一个字母并大写
      {logo: simplifyUrl(url)[0].toUpperCase(),
        url: url,      
    })
    //重新渲染hashMap
    render()
})
// 离开页面时触发
window.onbeforeunload = ()=>{
  // localStorage只能存字符串  所以把把一个hashMap对象变成字符串
  const string = JSON.stringify(hashMap)
  // 存到localStorage (key随便写)
  // 在本地的存储里面设置一个x 值为string 
  localStorage.setItem('x',string)
}
