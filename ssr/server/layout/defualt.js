export default (context, store, helmet) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/iconfont.css">
  <link rel=icon href="https://image.lcylove.cn/blog_favicon" type=image/x-icon>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
  <script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
  <meta name="keywords" content="Pawn的博客 李昌义的博客 前端 前端交流 前端学习 blog lcy lcylove lcylove.cn">
  ${helmet.title.toString()}
  ${helmet.link.toString()}
</head>
<body>
  <div id="root">${context}</div>
  <script>
    window.MY_SSR_DATA = {
      state: ${JSON.stringify(store.getState())}
    }
  </script>
  <script src="/js/client-bundle.js"></script>
</body>
</html>`;
