var keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]
var urls = {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined,
    a: 'animista.net',
    b: 'bilibili.com',
    c: 'codepen.io',
    d: 'dribbble.com',
    e: undefined,
    f: 'facebook.com',
    g: 'github.com',
    h: undefined,
    i: 'iconfont.cn',
    j: 'jquery.com',
    k: undefined,
    l: 'leancloud.cn',
    m: 'mozilla.org',
    n: 'nicovideo.jp',
    o: undefined,
    p: 'pixiv.net',
    q: 'qiniu.com',
    r: 'ruanyifeng.com',
    s: 'stackoverflow.com',
    t: 'taobao.com',
    u: 'unsplash.com',
    v: 'vuejs.org',
    w: 'w3.org',
    x: undefined,
    y: 'youtube.com',
    z: 'zhihu.com',
}

//  读取 userUrl
var userUrl = JSON.parse(localStorage.getItem('user') || 'null')
if (userUrl) {
    urls = userUrl
}

// 用 JS 创建 .keyboard 里的 .row kbd .editUrl .text .icon
createKeyboard()

function createKeyboard() {
    var keyboard = document.querySelector('.keyboard')

    for (var index = 0; index < keys.length; index++) {
        var row = document.createElement('div')
        row.className = 'row'

        for (var index2 = 0; index2 < keys[index].length; index2++) {
            var key = document.createElement('kbd')
            key.className = 'key'

            var span = document.createElement('span')
            span.className = 'text'
            span.textContent = keys[index][index2].toUpperCase()

            var img = document.createElement('img')
            img.className = 'icon'
            var domain = urls[span.innerText.toLowerCase()]
            setIconUrl(img, domain)

            var button = document.createElement('button')
            button.className = 'editUrl'
            button.textContent = '编辑'
            button.classList.add('hidden')
            editUrl(button)

            key.appendChild(button)
            key.appendChild(span)
            key.appendChild(img)
            row.appendChild(key)

        }
        keyboard.appendChild(row)
    }
}

// 用户编辑 url
function editUrl(button) {
    button.addEventListener('click', function (yyy) {
        var domain = window.prompt('请输入你要修改的网址') //把网址写入 urls
        var text2 = yyy.target.parentElement.querySelector('.text')
        var urlkey = text2.innerText.toLowerCase()
        var img2 = yyy.target.parentElement.querySelector('.icon')
        urls[urlkey] = domain

        //写入 usrUrl
        localStorage.setItem('user', JSON.stringify(urls))

        var domain2 = urls[urlkey]
        setIconUrl(img2, domain2)
    })
    return button
}

// 设置 icon 的 URL
function setIconUrl(img, domain) {
    var url = 'http://' + domain + '/favicon.ico'
    img.src = url || "https://i.loli.net/2019/09/02/swiY48DAmWuzeI9.png"
    img.onerror = function (xxx) {
        xxx.target.src = 'https://i.loli.net/2019/09/02/swiY48DAmWuzeI9.png'
    }
    return img
}

// 按下按键 跳转网页
keyToWeb()

function keyToWeb() {
    document.addEventListener('keypress', function (event) {
        var url = 'http://' + urls[event.key]
        window.open(url)
    })
}

// 当光标在搜索框时，阻止 按键冒泡
document.querySelector('.search').addEventListener('keypress', function (event) {
    event.stopPropagation()
})