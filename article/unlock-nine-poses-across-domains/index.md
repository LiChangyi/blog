---
path: unlock-nine-poses-across-domains
title: 解锁跨域的九种姿势
desc: 分析跨域，解锁跨域的九种姿势。
createAt: 2019.01.24
tag: [JS]
classify: Code
---
# 写在前面

**针对本文的九种方法我均写的有相应的demo演示(对应的前端文件，后端文件和配置文件)，强烈建议不熟悉的朋友都去尝试一下。** 本文[github地址](https://github.com/LiChangyi/crossDomain),`fontService`是前端地址文件，`service`是后端文件。

网络上存在很多不同的跨域文章，我在学习的时候基本上也是去看他们的文章，但是有些地方的确理解起来有点困难，所以本文就这样产生了，希望能写一点和现在网络上文章中都不一样的东西。同时也把我自己的看法写进去，和大家相互交流自己的看法。

**跨域**在以前一直折磨着每个前端开发者。但是现在，三大框架的普及，我们在开发的过程中，只修改小小的配置，便没有这些顾虑。但实质上还是`webpack-dev-server`已经帮我们处理了这一个问题，把当前请求，代理到目标服务器上面，然后把获取到的数据返回。所以，现在很多前端开发者，包括我在写这篇文章之前，对跨域都不是很了解，只有一个个模模糊糊的概念，只会用`jsonp`去获取，或者直接用jq的jsonp方法去解决跨域，都不会去了解为什么这样就能解决跨域？甚至，很多人对跨域都已经放弃了，因为三大框架的学习，完善的脚手架功能，简化了我们，项目部署也有后端的同学帮我们解决。但是个人认为跨域是每一个前端开发者需要必备的能力，不论是跨域获取数据，还是后面进行`ssr服务端渲染`的配置都需要了解一点跨域，了解一点请求的代理。

# 为什么存在跨域

**我们在解决的一个问题的同时我们应该先去了解这个问题是如何产生的。**

之所以要使用跨域，最终的罪魁祸首都是浏览器的**同源策略**，浏览器的同源策略限制我们只能在相同的协议、IP地址、端口号相同，如果有任何一个不通，都不能相互的获取数据。这里注意一下，`http`和`https`之间也存在跨域，因为https一般采用的是443端口，http采用的是80端口或者其他。这里也存在端口号的不同。想要详细了解请看 => [MDN对浏览器的同源策略的说明](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

虽然同源策略的确很可恶，但是如果没有同源策略用户将会陷入很境界。比如，你正在吃着火锅哼着歌，逛着淘宝买东西，但是这时你的同学给你发了一个网址，然后你直接打开来看，假如没有同源策略，他在该网站中用一个`iframe`的标签然后把src指向淘宝网，这时没有同源策略，他便可以直接通过js操作iframe的页面，比如说获取`cookie`或者用js模拟点击这些操作(因为你已经登录过了，可以不用再次登录就点击了)，危害是很大的。大家可以先去做一个小测验，你在本地创建一个`a.html`和`b.html`2个文件，然后在`a.html`中用iframe中插入`b.html`，你会发现当前2个页面是一个域的，你可以在a中通过js控制b，和在b中直接用js操作没有区别。但是如果你插入的不是同一个域下面的页面，比如你插入的是淘宝，你会发现你不能通过js操作，你`console.log(iframe.contentWindow)`你会发现只有少数的几项。大家可以去看看大佬的文章：[浅谈CSRF攻击方式](https://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)，虽然没有永远牢靠的盾，但是有同源策略的存在，会让攻击的成本变得高一点。

虽然同源策略危害很大，但是我们还是在一定的场景下面需要进行跨域处理，比如说百度全家桶，你在百度地图和百度搜索2者之间肯定是放在2个域下面的（我没有具体的去了解，但是我猜想肯定是这样的）。在开发地图的时候假如需要应用搜索的时候就不得不用跨域了。比如：百度搜索，输入文字出现内容提示，如果我没有判断错误就是采用的jsonp来做得跨域。大家在学习了jsonp跨域的时候，可以去尝试去获取一下。

# 进入正题

## 1.JSONP

说起如何去解决跨域，我相信每个人脑袋中跳出来的第一个词就是`jsonp`。因为浏览器的同源策略不限制`script`、`link`、`img`三个标签，比如我们经常用这三个标签来加载其他域的资源，我个人的看法这就已经算是跨域了。jsonp的跨域就是应用`script`标签可以进行获取远程的js脚本文件。

```javascript
// 比如1.js 脚本文件
say('haha');
```

我在html里面引入1.js文件，那么他讲会执行`say`函数，我们需要传入的数据就是`haha`。

所以jsonp的方法就是动态的创建一个`script`标签，然后设置src为我们需要进行跨域的地址。当然这个方法需要后台的设置。大家可以看我写的代码，

前端文件在`fontEndService/www/demo1/index,html`

```javascript
btn.onclick = () => {
    jsonp('http://127.0.0.1:8888/api/getdata?jsonp=displayData');
}
function jsonp(url) {
    let script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
}
function displayData(data) {
    msg.innerText = JSON.stringify(data);
}
```

然后后端代码是用koa写的一个简约的接口，文件在`service/app.js`

```javascript
// 简约的后端代码，我们直接调用前端传过来的需要执行的函数
router.get('/api/getdata', ctx => {
  const params = get_params(ctx.request.url)
  const data = {
    title: '数据获取',
    list: [0, 1, 2]
  }
  ctx.body = `${params.jsonp || 'callback'}(${JSON.stringify(data)})`;
})
```

前端通过script标签给后台发送一个get请求，在jsonp=displayData(一个我们接受到数据然后执行的方法，该方法是前端的)，当我后台接受到请求后，就返回一个，执行displayData这个方法的脚本。然后把我们需要传递的数据放在形参里面。这样就相当于我们在前端里面执行displayData这个方法。用这个方法来实现跨域资源的共享。

此方法是比较常用的一个方法，简单粗暴。但是此方法有一个致命的缺点就是只支持`GET`请求。所以说如果前端页面仅仅是作为页面的展示，就只获取数据的话，只用此方法就没有任何问题。

## 2.iframe+document.domain

这个方法，个人感觉不是特别的常用，因为这个跨域方法要求2个域之间的主域名相同，子域不同，比如a.xxx.com和b.xxx.com。如果不同的话是不行的。

此方法的思想就是设置页面的`document.domain`把他们设置成相同的域名，比如都设置成`xxx.com`。这样来绕过同源策略。很简单的一个方法，具体的代码文件请看github。

代码里面的测试案列是，前端文件在7777端口，后台文件在8888端口，前端如果需要请求后端的数据就存在跨域，所以我们在后端8888端口写一个提供数据的中转html，然后通过ajax或者其他的方法请求到数据，然后把数据往外暴露。此方法需要2个html都需要设置相同的主域。

## 3.iframe+location.hash

这种方法是一个很奇妙的方法，虽然我感觉很鸡肋，但是它的实现方法很巧妙，我在学习的时候都感觉到不可思议，还能这么玩？

首先我们需要了解hash是什么？

比如有一个这样的url：`http://www.xxx.com#abc=123`，那么我们通过执行`location.hash`就可以得到这样的一个字符串`#abc=123`，同时改变hash页面是不会刷新的。这一点，相信很多学习三大框架的朋友应该都见识过hash路由。所以说我们可以根据这一点来在`#`后面加上我们需要传递的数据。

加入现在我们有A页面在7777端口(前端显示的文件)，B页面在8888端口，后台运行在8888端口。我们在A页面中通过`iframe`嵌套B页面。

1. 从A页面要传数据到B页面

   我们在A页面中通过，修改`iframe`的`src`的方法来修改hash的内容。然后在B页面中添加`setInterval`事件来监听我们的hash是否改变，如果改变那么就执行相应的操作。比如像后台服务器提交数据或者上传图片这些。

2. 从B页面传递数据到A页面

   经过上面的方法，那么肯定有聪明的朋友就在想那么，从B页面向A页面发送数据就是修改A页面的hash值了。对没错方法就是这样，但是我在执行的时候会出现一些问题。我们在B页面中直接：

   ```javascript
   parent.location.hash = "#xxxx"
   ```

   这样是不行的，因为前面提到过的同源策略不能直接修改父级的hash值，所以这里采用了一个我认为很巧妙的方法。部分代码：

   ```javascript
   try {
       parent.location.hash = `message=${JSON.stringify(data)}`;
   } catch (e) {
       // ie、chrome 的安全机制无法修改parent.location.hash，
       // 利用一个中间html 的代理修改location.hash
       // 如A => B => C 其中，当前页面是B，AC在相同的一个域下。B 不能直接修改A 的 hash值故修改 C，让C 修改A
       // 文件地址： fontEndService/www/demo3/proxy.html
       if (!ifrProxy) {
           ifrProxy = document.createElement('iframe');
           ifrProxy.style.display = 'none';
           document.body.appendChild(ifrProxy);
       }
       ifrProxy.src = `http://127.0.0.1:7777/demo3/proxy.html#message=${JSON.stringify(data)}`;
   }
   ```

   如果可以直接修改我们就直接修改，如果不能直接修改，那么我们在B页面中再添加一个`iframe`然后指向C页面(我们暂时叫他代理页面，此页面和A页面是在相同的一个域下面)，我们可以用同样的方法在url后面我们需要传递的信息。在代理页面中：

   ```javascript
   parent.parent.location.hash = self.location.hash.substring(1);
   ```

   只需要写这样的一段js代码就完成了修改A页面的hash值，同样在A页面中也添加一个`setInterval`事件来监听hash值的改变。

   我们现在再来理一下思路。我们现在有三个页面，A,B,C。

   A页面是我们前端显示的页面；

   B页面我们可以把他当做A页面也后端数据交互的一个中间页面，完成接受A的数据和向后台发送请求。但是由于同源策略的限制我们不能在B页面中直接修改A的hash值，所以我们需要借助一个与A页面在同一个域名下的C页面。

   C页面我们把他当中一个代理页面，我们因为他和A页面在一个域下，所以可以修改A的hash值。所以B页面修改C页面的hash值，然后C页面修改A页面的hash值。（C就是一个打工的）

此方法虽然我个人感觉实现的思路很巧妙但是，使用价值似乎不高，因为他实现的核心思路就是通过修改URL的hash值，然后用定时器来监听值的改变来修改。所以说最大的问题就是，我们传递的数据会直接在URL里面显示出来，不是很安全，同时URL的长度是一定的所以传输的数据也是有限的。

## 4.iframe+window.name

相比于前面2种`iframe`的方法，这种方法的使用人数要多一点。因为他有效的解决了前面2种方法很大的缺点。这种方法的原理就是**window.name属性在于加载不同的页面(包括域名不同的情况下)，如果name值没有修改，那么它将不会变化。并且这个值可以非常的长(2MB)**

方法原理：A页面通过`iframe`加载B页面。B页面获取完数据后，把数据赋值给window.name。然后在A页面中修改`iframe`使他指向本域的一个页面。这样在A页面中就可以直接通过`iframe.contentWindow.name`获取到B页面中获取到的数据。

A页面中部分代码：

```javascript
let mark = false;
let ifr = document.createElement('iframe');
ifr.src = "http://127.0.0.1:8888/demo4";
ifr.style.display = 'none';
document.body.appendChild(ifr);
ifr.onload = () => {
    // iframe 中数据加载完成，触发onload事件
    if (mark) {
        msg.innerText = ifr.contentWindow.name;// 这就是数据
        document.body.removeChild(ifr);
        mark = false;
    } else {
        mark = true;
        // 修改src指向本域的一个页面（这个页面什么都没有）
        ifr.contentWindow.location = "http://127.0.0.1:7777/demo4/proxy.html";
    }
}
```

## 5.postMessage

[postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)是HTML5引入的API。他可以解决多个窗口之间的通信(包括域名的不同)。我个人认为他算是一种消息的推送，可以给每个窗口推送。然后在目标窗口添加`message`的监听事件。从而获取推送过来的数据。

A页面中部分代码：

```javascript
<iframe id="iframe" src="http://127.0.0.1:8888/demo5" frameborder="0"></iframe>

iframe.contentWindow.postMessage('getData', 'http://127.0.0.1:8888');

// 监听其他页面给我发送的数据
window.addEventListener('message', e => {
    if (e.origin !== 'http://127.0.0.1:8888') return;
    msg.innerText = e.data;
})
```

这里我们给目标窗口`127.0.0.1:8888`推送了getData的数据。然后在B页面中添加事件的监听。

B页面中部分代码：

```javascript
window.addEventListener('message', e => {
    // 判断来源是不是我们信任的站点，防止被攻击
    if (e.origin !== 'http://127.0.0.1:7777') return;
    const data = e.data;
    if (data === 'getData') {
        // 根据接受到的数据，来进行下一步的操作
        myAjax('/api/getdata', notice);
    }
})
function notice(data) {
    // 向后台请求到数据以后，在向父级推送消息
    top.postMessage(JSON.stringify(data), 'http://127.0.0.1:7777')
}
```

我个人认为这种方式就是一个事件的发布与监听，至少说可以无视同源策略。

## 6.cors

其实对于跨域资源的请求，浏览器已经把我们的请求发放给了服务器，浏览器也接受到了服务器的响应，只是浏览器一看我们2个的域不一样就把消息给拦截了，不给我们显示。所以我们如果我们在服务器就告诉浏览器我这个数据是每个源都可以获取就可以了。这就是CORS跨域资源共享。

在后台代码中我以KOA列子

```javascript
const Koa = require('koa');
const router = require('koa-router')();
// 引入中间件
const cors = require('koa2-cors');

const app = new Koa();

// 根据后台服务器的类型，打开跨域设置
// cors安全风险很高，所以，实际线上的配置肯定要比这个更加复杂，需要根据自己的需求来做
app.use(cors());

router.get('/api/getdata', ctx => {
  ctx.body = {
    code: 200,
    msg: '我是配置有cors的服务器传输的数据'
  }
})

app.use(router.routes(), router.allowedMethods());

console.log('配置有cors的服务器地址在：http://127.0.0.1:8889');
app.listen(8889);
```

这样的话，任何源都可以通过AJAX发起请求来获取我们提供的数据。针对不同语言的服务器后端有不一样的处理方法，但是实质是一样的。

配置了CORS的浏览器请求响应信息
![配置了CORS的浏览器请求响应](https://ws1.sinaimg.cn/large/006A3ND3gy1fziv9hogvaj30ld0gignv.jpg)
跨域请求响应信息
![跨域请求响应信息](https://ws1.sinaimg.cn/large/006A3ND3gy1fziv9h9osej30on0dhmzc.jpg)

## 7.NGINX

采用nginx做代理应该是目前跨域解决方案最好的一种。现在强调前后端分离，前端根据后端提供的接口进行数据的交互然后渲染页面。在前端三大框架的同时，开发过程中不需要我们针对跨域配置很多。在网页上线以后。我们经常采用nginx来加载静态的资源，我们把我们前端打包好的文件放到nginx的目录下面，让nginx来处理客服端的静态资源的请求。然后后端部署到另外一个端口号上面，当我们需要进行数据的交互的时候，通过nginx代理把后端数据代理到前端页面。这样的步骤是相较于传统的跨域是最简单也是最有效的一种方法，因为nginx又没有同源策略。不用考虑什么兼容性也不用考虑数据大小。我们在服务器(或者测试代码的时候在本地)安装nginx服务，然后找到我们nginx的配置文件，添加以下配置文件：

```
server {
  # 把页面部署的端口
  listen 8080;

  # 静态页面存放的目录
  root /var/www/html; 
  index  index.html index.htm index.php;

  # 只代理 /api 开头的接口，其他接口不代理
  location /api/ {
    # 需要代理的地址， 输入我们的后台api地址
    proxy_pass http://127.0.0.1:8888;
  }
}
```

这样，我们可以代理不同url开头的请求到不同的后端进行处理，对以后服务器做负载均衡和反向代理也很简单。

## 8.nodejs

其实这种办法和上一种用nginx的方法是差不多的。都是你把请求发给一个中间人，由于中间人没有同源策略，他可以直接代理或者通过爬虫或者其他的手段得到想到的数据，然后返回(是不是和VPN的原理有点类似)。

当然现在常见的就是用nodejs作为数据的中间件，同样，不同的语言有不同的方法，但是本质是一样的。我上次自己同构自己的博客页面，用`react`服务器端渲染，因为浏览器的同源策略，请求不到数据，然后就用了nodejs作为中间件来代理请求数据。

部分代码：

```java
const Koa = require('koa');
// 代理
const Proxy = require('koa-proxy');
// 对以前的异步函数进行转换
const Convert = require('koa-convert');

const app = new Koa();
const server = require('koa-static');
app.use(server(__dirname+"/www/",{ extensions: ['html']}));

app.use(Convert(Proxy({
  // 需要代理的接口地址
  host: 'http://127.0.0.1:8888',
  // 只代理/api/开头的url
  match: /^\/api\//
})));

console.log('服务运行在:http://127.0.0.1:7777');
app.listen(7777);
```

是不是和nginx很类似呀！！

## 9.webSocket

webSocket大家应该都有所耳闻，主要是为了客服端和服务端进行全双工的通信。但是这种通信是可以进行跨端口的。所以说我们可以用这个`漏洞`来进行跨域数据的交互。

我个人认为，这种方法实质上和postMessage差不多，但是不是特别的常用吧！(仅仅个人看法)

所以说我们可以很轻松的构建基于`webSocket`构建一个客服端和服务端。代码在github建议大家都多多去运行一下，了解清楚。这里就不贴了。

# 最后

哇！长长短短的写了5000多字终于写到最后了！！写总结真的比写代码还困难。

个人觉得，第1种方法和第6种方法是以前常用的一种方法，毕竟以前基本上都是刀耕火种的前端时代。然后2,3,4种方法基本上现在很少有人会用，包括我没去详细了解之前也不会，但是里面有很多思想却值得我们去思考，比如第3种方法，反正我个人觉得很巧妙。第5，9种个人认为，这2种方法虽然可以解决跨域，但是把他们用在跨域有点`大材小用`了解就好。第7,8种方法，觉得应该是现在每个前端er都应该掌握的方法，应该以后解决跨域的主要方法。

所有的代码都在github上面，地址在文章开头，我强烈建议都clone下来跑一边代码，最好是结合自己的理解把9种方法都去实现一下。

由于我也是才了解跨域不久，本文有很多地方仅仅是我个人看法，欢迎大佬补充、勘误！