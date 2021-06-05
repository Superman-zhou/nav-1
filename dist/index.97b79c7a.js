(function () {
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList = $('.siteList');
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$LastLi = $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find('li.last');
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$x = localStorage.getItem('x');
// 把获取到的字符串x再变成 对象
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject = JSON.parse($16b5ad875ae907e2f7f79e7b8fe116cc$var$x);
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap = $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn/'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com/'
    }, 
];
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl = (url)=>{
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace('.cn', '').replace('.com', '').replace(/\/.*/, ''); //正则表达式（删除/开头的内容）
};
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$render = ()=>{
    //找到全部li,唯独不要最后一个li（也就是新增）删掉
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find('li:not(.last)').remove();
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.forEach((node, index)=>{
        const $li = $(`<li>\n      <div class="site">\n        <div class="logo">${node.logo}</div>\n        <div class="link">${$16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(node.url)}</div>\n        <div class="close">\n          <svg class="icon">\n            <use xlink:href="#icon-close"></use>\n          </svg>\n        </div>\n      </div>\n    </li> `).insertBefore($16b5ad875ae907e2f7f79e7b8fe116cc$var$$LastLi);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation(); //阻止冒泡
            $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.splice(index, 1);
            $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
        });
    });
};
$16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
$('.addButton').on('click', ()=>{
    let url = window.prompt('输入需要添加的网址');
    if (url.indexOf('http') !== 0) url = 'https://' + url;
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.push(// logo取删除后的第一个字母并大写
    {
        logo: $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    //重新渲染hashMap
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
});
// 离开页面时触发
window.onbeforeunload = ()=>{
    // localStorage只能存字符串  所以把把一个hashMap对象变成字符串
    const string = JSON.stringify($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap);
    // 存到localStorage (key随便写)
    // 在本地的存储里面设置一个x 值为string 
    localStorage.setItem('x', string);
};

})();
//# sourceMappingURL=index.97b79c7a.js.map
