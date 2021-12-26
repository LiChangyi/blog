---
path: vue-koa-mongodb-build-blog
title: vue+koa+mongodb 搭建个人博客
desc: vue+koa+mongodb 个人博客,阶段学习概括!
createAt: 2018.09.06
tag: [Vue, Koa, MongoDB, Blog]
classify: Code
---
## Begin

很久以来就特别想搭建一个blog，但是都是由于技术原因没有搭建起来。以前学习github的时候准备采用github与hexo来搭建。但是后来想了一下自己也在学习nodejs，何不用自己学的vue和nodejs来搭建，这样也起到了锻炼自己的目的，于是此博客由此而生。
github: [https://github.com/LiChangyi/blog](https://github.com/LiChangyi/blog)

博客地址：[blog.lcylove.cn](https://blog.lcylove.cn)

## 技术组成

1. 前端 => vue,vuex,axios
2. 后台 => nodejs koa2
3. 数据库 => mongodb mongoose
4. markdown => marked + highlight.js
5. 评论系统 => gitalk
6. 图片的储存 => 七牛云储存(前端构造接口，直接上传到七牛云上)
7. 服务器 => 腾讯云服务器(学生特惠10元/月) nginx

## 博客预览

![博客预览1](https://ws1.sinaimg.cn/large/006A3ND3gy1fymvyp7n30j31ez0q57rs.jpg)


![博客预览2](https://ws1.sinaimg.cn/large/006A3ND3gy1fymvyo2wnaj31ex0q515j.jpg)


![博客预览3](https://ws1.sinaimg.cn/large/006A3ND3gy1fymvyn2k1oj31f70q3mz6.jpg)


![博客预览4](https://ws1.sinaimg.cn/large/006A3ND3gy1fymvyn2h9wj31f90q375q.jpg)


![博客预览5](https://ws1.sinaimg.cn/large/006A3ND3gy1fymvyn7xcoj31f60q4adz.jpg)

## 待完成

1. 因为单页应用seo一直是一个很大的问题，虽然本次我使用了网上提及的**vue-meta-info** 和 **prerender-spa-plugin** 预渲染的方式，但是发现SEO的问题依然存在，所以后期有时间会将前台界面用nuxtJS改写成ssr渲染。
2. 学习Typescript，并对代码进行重构。(因为感觉代码可读性不是特别的好)

## 写在后面的话

>  学习是一个持续的过程，我们应该一直持之以恒的学习下去。
>
> 很多事有想法一定要去做，做了才有机会做完，做好。

1. 由于本人技术问题，代码肯定存在很多bug还未发现，其次就是第一次做vue+nodejs一个完整的项目，所以肯定有很多地方存在瑕疵，之所以发布出来一方面可以给需要这一方面东西的朋友一点启发，其次就是发现问题改进问题提升自己。
2. 因为整个博客要完整的从项目构建到项目上线的确比较繁琐，这里只是给想要试试nodejs与vue一个代码参考。如果是才学习vue以及nodejs的同学可能不需要这么多的东西，所以针对这一块，我后面会针对这一方面出一个vue+koa2+mongodb的一个完整的登录注册流程到项目部署，以及采用pm2进行进程守护，采用nginx来加载页面并使用代理的方式完成网页的正常运行。

