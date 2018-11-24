# 个人博客系统

>  更新 2018-11-24
>
>  上传react版本到react分支，详情请看react分支
>
>  ------
>
>  前端 => vue全家桶
>
>  后台 => nodejs koa2
>
>  数据库 => mongodb mongoose
>
>  服务器 => centOS 7 nginx
>
>  图片保存/静态资源 => 七牛云
>
>  admin文件夹是博客后台管理界面代码，client是博客的前台显示页面代码，server是后台服务器代码。

博客的评论采用gitalk插件，内容就存放在此仓库的 issues

博客地址： [blog.lcylove.cn](https://blog.lcylove.cn)

## Run

1. clone 本仓库到本地

2. 打开mongodb服务，开启mongodb数据库

3. 进入server文件夹,打开node服务

   ```bash
   cd ./server
   npm i & cnpm i
   npm start
   ```

4. 进入admin文件夹或client文件夹

   ```bash
   cd ./admin & cd ./client
   npm i & cnpm i
   npm run dev
   ```
