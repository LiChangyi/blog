import{_ as n}from"./index.vue_vue_type_script_setup_true_lang.4f7cfb50.js";import{d as e,k as o}from"./app.736fae21.js";import"./constant.e4efd1a3.js";const c=e({setup(){return()=>o(n,{article:{path:"vue-koa-mongodb-practice",title:"Vue+Koa+Mongodb \u5C0F\u7EC3\u4E60",desc:"\u57FA\u4E8Evue koa mongodb\u8FDB\u884C\u767B\u5F55\uFF0C\u6CE8\u518C\uFF0C\u7559\u8A00\u7684\u7B80\u5355\u7F51\u7AD9\u3002",createAt:"2018.09.18",tag:["Vue","Koa","MongoDB"],classify:"Code",content:`<h2>\u524D\u9762\u7684\u8BDD</h2>
<h3>\u539F\u56E0</h3>
<ol>
<li>\u524D\u6BB5\u65F6\u95F4\u7528vue+koa+mongodb\u642D\u5EFA\u4E86\u4E00\u4E2A\u4E2A\u4EBA\u535A\u5BA2\uFF0C\u56E0\u4E3A\u662F\u7B2C\u4E00\u6B21\u5199\u524D\u540E\u4EA4\u4E92\uFF0C\u53D1\u73B0\u6709\u5F88\u591A\u5730\u65B9\u4E0D\u662F\u7279\u522B\u7684\u5B8C\u5584\uFF0C\u540C\u65F6\u4EE3\u7801\u5BF9\u4E8E\u65B0\u5B66\u8005\u6765\u8BF4\u53EF\u8BFB\u6027\u4E5F\u4E0D\u662F\u5F88\u5927\u3002\u6240\u4EE5\u8FD9\u4E2A\u5C0F\u7EC3\u4E60\uFF0C\u4ECE\u4E00\u4E2A\u7B80\u5355\u7684\u65B9\u9762\u5165\u624B\uFF0C\u5E0C\u671B\u80FD\u7ED9\u8E29\u8FC7\u540C\u6837\u591A\u5751\u7684\u540C\u8DEF\u4EBA\u4E00\u70B9\u542F\u53D1\u3002</li>
<li>\u5728\u6211\u4ECA\u5E74\u5E74\u521D\u5728\u5B66\u4E60vue\u4EE5\u53CAkoa\u7684\u65F6\u5019\uFF0C\u7F51\u4E0A\u5BF9\u8FD9\u65B9\u9762\u7684\u5185\u5BB9\uFF0C\u90FD\u662F\u4E00\u4E2A\u5B8C\u6574\u7684\u9879\u76EE\uFF0C\u6587\u4EF6\u592A\u591A\uFF0C\u89C2\u770B\u96BE\u5EA6\u592A\u5927\uFF0C\u5176\u6B21\u662F\uFF0C\u90FD\u5BF9\u56FE\u7247\u7684\u4E0A\u4F20\u90FD\u6CA1\u600E\u4E48\u6D89\u53CA\u3002</li>
<li>\u6211\u5728\u5B66\u4E60\u90E8\u7F72koa\u548Cvue\u7684\u9879\u76EE\u7684\u65F6\u5019\uFF0C\u7F51\u4E0A\u7684\u77E5\u8BC6\u5F88\u96F6\u788E\uFF0C\u8FD9\u91CC\u6211\u4F1A\u5F52\u7EB3\u4E00\u4E0B\u3002</li>
</ol>
<h3>\u6D89\u53CA\u77E5\u8BC6\u70B9</h3>
<ol>
<li>vue\u5168\u5BB6\u6876\u7684\u4F7F\u7528</li>
<li>\u5728vue\u4E2D\u4F7F\u7528axios\uFF0C\u5E76\u914D\u7F6E\u5B83</li>
<li>koa\u4E0Emongoose\u7684\u57FA\u672C\u4F7F\u7528</li>
<li>jsonwebtoken\u7684\u4F7F\u7528\u4EE5\u53CA\u524D\u540E\u53F0\u9274\u5B9A\u767B\u5F55</li>
</ol>
<p><strong>\u6CE8\uFF1A \u672C\u6587\u9762\u5BF9\u521A\u5B66vue\u6216\u8005koa\u4E0D\u4E45\u6216\u8005\u60F3\u4E86\u89E3\u4E00\u4E2A\u7B80\u5355\u7684\u524D\u540E\u53F0\u4EA4\u4E92\u7684\u95EE\u9898\u7684\u540C\u5B66\uFF0C\u6D89\u53CA\u57FA\u7840\u3002</strong></p>
<h3>\u9884\u89C8</h3>
<p><div class="image-block"><img src="/loading.png" alt="\u9996\u9875\u9884\u89C8" class="image" data-src="https://ws1.sinaimg.cn/large/006A3ND3gy1fymvyn2936j30z40ldq4m.jpg"><p class="image-title">\u9996\u9875\u9884\u89C8</p></div></p>
<p><div class="image-block"><img src="/loading.png" alt="\u767B\u5F55\u9884\u89C8" class="image" data-src="https://ws1.sinaimg.cn/large/006A3ND3gy1fymvyn1nm9j30r30gc3yw.jpg"><p class="image-title">\u767B\u5F55\u9884\u89C8</p></div></p>
<p><div class="image-block"><img src="/loading.png" alt="\u6CE8\u518C\u9884\u89C8" class="image" data-src="https://ws1.sinaimg.cn/large/006A3ND3gy1fymvyn195yj30om0n6js3.jpg"><p class="image-title">\u6CE8\u518C\u9884\u89C8</p></div></p>
<h2>\u611F\u5174\u8DA3\u7684\u95EE\u9898</h2>
<blockquote>
<p>\u6211\u5728\u4EE3\u7801\u91CC\u9762\u5199\u4E86\u5F88\u591A\u7684\u6CE8\u91CA\u65B9\u4FBF\u9605\u8BFB\uFF0C\u8FD9\u91CC\u7B80\u5355\u8BF4\u4E00\u4E0B\u6211\u4E2A\u4EBA\u5F53\u521D\u5B66\u4E60\u7684\u65F6\u5019\u6BD4\u8F83\u7591\u60D1\u4E3A\u95EE\u9898</p>
</blockquote>
<h3>\u4E00\u4E9B\u5C0F\u53D8\u52A8</h3>
<p>\u524D\u7AEF\u76F4\u63A5\u91C7\u7528vue-cli\u8FDB\u884C\u4E00\u4E2A\u57FA\u7840\u7684\u9879\u76EE\u9AA8\u67B6\u3002\u7136\u540E\u7531\u4E8E\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u9879\u76EE\uFF0C\u6240\u4EE5\u9875\u9762\u5C31\u968F\u4FBF\u5199\u4E00\u4E0B\uFF0C\u4E3B\u8981\u662F\u5B9E\u73B0\u529F\u80FD\u3002</p>
<p>\u56E0\u4E3A\u6211\u4EEC\u5728\u670D\u52A1\u5668\u4E0A\u9762\u91C7\u7528\u7684\u662F\u4E8C\u7EA7\u57DF\u540D\u7684\u5F62\u5F0F\uFF0C\u6240\u4EE5\u9700\u8981\u5728 <code>config/index.js</code> \u4E0B\u9762\u7684 <code>build</code> \u9879\u91CC\u9762\u5C06 <code>assetsPublicPath</code> \u8BBE\u7F6E\u6210\u76F8\u5BF9\u8DEF\u5F84\u3002</p>
<pre><code class="language-javascript"><span class="token literal-property property">assetsPublicPath</span><span class="token operator">:</span> <span class="token string">''</span>
</code></pre>
<p>\u6211\u4EEC\u5728\u672C\u5730\u5F00\u53D1\u7684\u65F6\u5019\u9700\u8981\u8FDB\u884C\u8C03\u8BD5\uFF0C\u9700\u8981\u7528\u5230\u4EE3\u7406\uFF0C\u4E0D\u7136\u5C31\u53EA\u6709\u8BBE\u7F6E\u540E\u53F0\u5141\u8BB8\u8DE8\u57DF\u3002\u6240\u4EE5\u5728  <code>config/index.js</code> \u4E0B\u9762\u7684 <code>dev</code> \u5BF9\u8C61\u91CC\u9762\u6DFB\u52A0\uFF1A</p>
<pre><code class="language-javascript"><span class="token literal-property property">proxyTable</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'/api'</span><span class="token operator">:</span><span class="token punctuation">{</span>  <span class="token comment">// \u53EA\u4EE3\u7406 /api url\u4E0B\u7684\u8BF7\u6C42</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">"https://localhost:7778"</span><span class="token punctuation">,</span> <span class="token comment">// \u540E\u53F0\u670D\u52A1\u5668\u7684\u5730\u5740</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<h3>\u5982\u4F55\u8BA9\u670D\u52A1\u5668\u7AEF\u8BB0\u4F4F\u4F60(jsonwebtoken)</h3>
<p>HTTP\u8BF7\u6C42\u662F\u65E0\u72B6\u6001\u7684\uFF0C\u610F\u601D\u662F\u4ED6\u8BB0\u4E0D\u4F4F\u4F60\u8FD9\u4E2A\u4EBA\u662F\u8C01\uFF0C\u4ED6\u53EA\u77E5\u9053\u4F60\u8981\u4EC0\u4E48\u8D44\u6E90\uFF0C\u7136\u540E\u7ED9\u4F60\u4EC0\u4E48\u3002\u4F46\u662F\u5B9E\u9645\u95EE\u9898\u662F\u5F53\u7528\u6237\u7ED9\u6211\u4EEC\u5BFB\u6C42\u8D44\u6E90\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u5E94\u8BE5\u8981\u8003\u8651\u5E94\u8BE5\u7ED9\u4ED6\u8FD9\u4E2A\u8D44\u6E90\u3002\u5BF9\u8FD9\u4E2A\u4EBA\u7684\u8EAB\u4EFD\u505A\u4E00\u4E2A\u5224\u522B\uFF0C\u7136\u540E\u5728\u505A\u51B3\u5B9A\u7ED9\u4ED6\u4EC0\u4E48\u6837\u7684\u8D44\u6E90\u3002</p>
<p>\u6240\u4EE5\u9488\u5BF9\u6BCF\u4E2A\u7528\u6237\u6211\u4EEC\u9700\u8981\u7528\u4E00\u4E2A\u552F\u4E00\u7684\u6807\u8BC6\u6765\u786E\u5B9A\u4ED6\uFF0C\u8FD9\u5C31\u662F\u4E3A\u4EC0\u4E48\u9700\u8981\u767B\u5F55\u624D\u80FD\u64CD\u4F5C\uFF0C\u767B\u5F55\u7684\u76EE\u7684\u5C31\u662F\u8BA9\u670D\u52A1\u7AEF\u4EA7\u751F\u4E00\u4E2A\u8BA4\u8BC6\u4F60\u7684\u6807\u8BC6\uFF0C\u4EE5\u540E\u4F60\u7684\u6BCF\u6B21\u8BF7\u6C42\u90FD\u8981\u5E26\u4E0A\u53BB\u3002</p>
<p>\u5728\u524D\u540E\u53F0\u4E0D\u5206\u79BB\u7684\u65F6\u5019\uFF0C\u670D\u52A1\u5668\u7AEF\u5F80\u5F80\u4F1A\u5728\u5BA2\u670D\u7AEF\u653E\u4E00\u4E2A<code>SessionId</code> \u6216\u8005\u4E00\u4E2A<code>cookie</code>\u7684\u4E1C\u897F\u3002\u4F46\u662F\u73B0\u5728\u524D\u540E\u7AEF\u5206\u79BB\u4EE5\u540E\uFF0C\u6211\u4EEC\u767B\u5F55\u6210\u529F\uFF0C\u670D\u52A1\u5668\u7AEF\u5E94\u8BE5\u4E5F\u4F1A\u7ED9\u6211\u4EEC\u8FD9\u6837\u4E00\u4E2A\u552F\u4E00\u6807\u8BC6\u8EAB\u4EFD\u7684\u5B57\u7B26\u4E32\u3002\u7136\u540E\u6211\u4EEC\u5728\u6BCF\u6B21\u8BF7\u6C42\u6570\u636E\u7684\u65F6\u5019\u5E26\u4E0A\u5B83\u3002\u8FD9\u91CC\u6211\u670D\u52A1\u5668\u7AEF\u91C7\u7528\u7684\u662F<code>jsonwebtoken</code> \u6765\u5236\u9020\u8FD9\u4E2A\u552F\u4E00\u6807\u8BC6\uFF0C\u4EE3\u7801\u8BE6\u60C5 =&gt; <code>server/utils/token.js</code> \u7136\u540E\u6211\u5199\u4E86\u4E00\u4E2A\u4E2D\u95F4\u4EF6<code>check_token</code> \u6765\u5224\u65AD\u5982\u679C\u8FD9\u4E2A\u8D44\u6E90\u9700\u8981\u767B\u5F55\uFF0C\u5C31\u4F1A\u53BB\u68C0\u67E5\u4ED6\u7684token\u5982\u679Ctoken\u4E0D\u5BF9\u90A3\u4E48\u5C31\u76F4\u63A5\u629B\u51FA\u9519\u8BEF\u3002</p>
<p>\u524D\u7AEF\u62FF\u5230\u670D\u52A1\u7AEF\u7684token\u540E\u6211\u4EEC\u9700\u8981\u628A\u4ED6\u5B58\u653E\u8D77\u6765\u8FD9\u91CC\u5927\u6982\u4F1A\u67092\u79CD\u65B9\u5F0F\uFF1A</p>
<ol>
<li>\u5B58\u5728vuex \u91CC\u9762\uFF0C \u8FD9\u79CD\u65B9\u5F0F\u6709\u4E00\u4E2A\u5F0A\u7AEF\u5C31\u662F\uFF0C\u7F51\u9875\u4E00\u5237\u65B0vuex\u91CC\u9762\u7684\u6570\u636E\u5C31\u6E05\u7A7A\u4E86\u3002\u5C31\u610F\u5473\u7740\u8981\u91CD\u65B0\u767B\u5F55\u3002</li>
<li>\u5B58\u5728sessionStorage\u91CC\u9762\uFF0C\u91C7\u7528\u6D4F\u89C8\u5668\u7684\u4F1A\u8BDD\u5B58\u50A8\uFF0C\u53EA\u6709\u5F53\u6D4F\u89C8\u5668\u5173\u95ED\u7684\u65F6\u5019\u624D\u4F1A\u6E05\u7A7A\u6570\u636E\u3002</li>
</ol>
<p>\u8FD9\u91CC\u6211\u628A2\u79CD\u65B9\u6CD5\u7ED3\u5408\u8D77\u6765\uFF0C\u5F97\u5230token\u7684\u65F6\u5019\u628A\u4ED6\u540C\u65F6\u5B58\u653E\u5728vuex\u548CsessionStorage\u91CC\u9762\uFF0C\u5B58\u653E\u5728vuex\u91CC\u9762\u662F\u4E3A\u4E86\u64CD\u4F5C\u65B9\u4FBF\uFF0C\u5B58\u653E\u5728sessionStorage\u662F\u4E3A\u4E86\u4FDD\u6301\u5237\u65B0\u9875\u9762\u7684\u65F6\u5019\u6570\u636E\u4E0D\u4E22\u5931\u3002\u5728\u524D\u7AEF\u6BCF\u6B21\u5411\u540E\u53F0\u8BF7\u6C42\u6570\u636E\u7684\u65F6\u5019\uFF0C\u5E26\u4E0A\u8FD9\u4E2Atoken,\u8BE6\u89C1\u4EE3\u7801 =&gt; <code>client/src/axios/index.js</code></p>
<p>\u5173\u4E8E\u4E00\u4E9B\u7F51\u4E0A\u7684\u4E89\u8BBA\uFF1A</p>
<p>Q \uFF1A\u6709\u4EBA\u8BF4\uFF0C\u8BA9\u5BA2\u670D\u7AEF\u5B58\u653Etoken\u4E0D\u5B89\u5168\uFF0C\u6216\u8005\u8BF4\u7528sessionStorage\u65B9\u6CD5\u6765\u5B58\u653E\u4E0D\u5B89\u5168\uFF0C\u56E0\u4E3A\u5B58\u5728\u7740csrf\u95EE\u9898</p>
<p>A \uFF1A\u6CA1\u6709\u7EDD\u5BF9\u7684\u5B89\u5168\uFF0C\u6211\u4E2A\u4EBA\u4E86\u89E3\u5230\u5C31\u662F\u7528\u4EE5\u524D\u7684<code>cookie</code>\u6216\u8005<code>SessionId</code> \u4E5F\u5B58\u5728\u7740\u8FD9\u6837\u7684\u95EE\u9898\u3002\u60F3\u8981\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u5C31\u5C3D\u91CF\u7684\u5427\u7F51\u9875\u5347\u7EA7\u6210https\uFF0C\u6216\u8005\uFF0C\u91C7\u7528\u670D\u52A1\u5668\u4E2D\u8F6C\u7684\u65B9\u5F0F\uFF0C\u57282\u8005\u4E4B\u95F4\u5728\u52A0\u5165\u4E00\u4E2A\u670D\u52A1\u5668\u7AEF\uFF0C\u628A\u771F\u5B9E\u7684token\u5B58\u653E\u5728\u4E2D\u8F6C\uFF0C\u7136\u540E\u5BA2\u670D\u7AEF\u4E0E\u4E2D\u8F6C\u8FDB\u884C\u901A\u4FE1\u3002</p>
<h3>\u9A8C\u8BC1\u7801\u7684\u8BC6\u522B</h3>
<p>\u9A8C\u8BC1\u7801\u7684\u751F\u6210\u6211\u91C7\u7528\u4E86<code>gd-bmp</code> \u5305\u5177\u4F53\u7528\u6CD5\uFF0C\u770B<code>server/controller/other.js</code> \u540C\u6837\u6839\u636E\u4E0A\u9762\u7684\u4ECB\u7ECD\uFF0Chttp\u662F\u6CA1\u6709\u72B6\u6001\u7684\uFF0C\u6211\u4EEC\u8981\u9A8C\u8BC1\u9A8C\u8BC1\u7801\u7684\u6B63\u786E\u6027\uFF0C\u5E94\u8BE5\u5BF9\u6BCF\u4E2A\u9A8C\u8BC1\u7801\u589E\u52A0\u4E00\u4E2A\u552F\u4E00\u7684\u6807\u8BC6\uFF0C\u7136\u540E\u5B58\u653E\u5728\u6570\u636E\uFF0C\u5F53\u7528\u6237\u767B\u5F55\u6216\u8005\u7528\u6237\u6CE8\u518C\u7528\u5230\u9A8C\u8BC1\u7801\u7684\u65F6\u5019\uFF0C\u628A\u9A8C\u8BC1\u7801\u548C\u76F8\u5E94\u7684\u9A8C\u8BC1\u7801\u6807\u8BC6\u4E00\u8D77\u53D1\u5F80\u540E\u53F0\uFF0C\u7136\u540E\u5224\u65AD\u9A8C\u8BC1\u7801\u7684\u6B63\u786E\u4E0E\u5426\u3002\u5BF9\u4E8E\u9A8C\u8BC1\u7801\u53CA\u6807\u8BC6\u7684\u5B58\u50A8\uFF0C\u6211\u8FD9\u91CC\u4E3A\u4E86\u65B9\u4FBF\u5C31\u662F\u91C7\u7528mongodb\u6765\u5B58\u50A8\uFF0C\u4F46\u662F\u7F51\u4E0A\u5F88\u591A\u4EBA\u63A8\u8350\u7528redis\u6765\u5B58\u50A8\u3002</p>
<h3>\u672C\u5730\u56FE\u7247\u7684\u4E0A\u4F20</h3>
<p>\u8FD9\u4E2A\u95EE\u9898\u4ECE\u5F88\u4E45\u4EE5\u524D\u5C31\u5F88\u8FF7\u60D1\uFF0C\u4E00\u76F4\u4E0D\u77E5\u9053\u5982\u4F55\u4E0A\u4F20\u56FE\u7247\u5230\u670D\u52A1\u5668\u3002\u5373\u4F7Fh5\u51FA\u73B0\u4E86<code>&lt;input type=&quot;file&quot;&gt;</code>\u4F46\u662F\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u4E5F\u662F\u5F88\u9EBB\u70E6\u3002\u6211\u4E2A\u4EBA\u89C9\u5F97\u4E0A\u4F20\u56FE\u7247\u5E94\u8BE5\u67092\u79CD\u65B9\u5F0F\uFF1A</p>
<ol>
<li>\u76F4\u63A5\u7528\u8FC7input\u7684onchang\u4E8B\u4EF6\u83B7\u53D6\u5230\u7684\u6587\u4EF6\uFF0C\u6765\u4E0A\u4F20\u4E8C\u8FDB\u5236\u6587\u4EF6\u3002</li>
<li>\u5C06\u56FE\u7247\u8F6C\u6362\u6210base64\u6765\u8FDB\u884C\u4E0A\u4F20</li>
</ol>
<p>\u6211\u8FD9\u91CC\u91C7\u7528\u7684\u662F\u7B2C\u4E8C\u79CD\uFF0C\u7528base64\u4E0A\u4F20\u56FE\u7247\uFF0C\u7136\u540E\u81EA\u5DF1\u5427base64\u5B57\u7B26\u4E32\u4FDD\u5B58\u8FDB\u6570\u636E\u5E93\uFF0C\u56E0\u4E3A\u64CD\u4F5C\u6BD4\u8F83\u65B9\u4FBF\u3002\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u5728\u670D\u52A1\u5668\u7AEF\u5427base64\u8F6C\u6362\u6210\u4E8C\u8FDB\u5236\u6587\u4EF6\u5B58\u653E\u5728\u670D\u52A1\u5668\u91CC\u9762\uFF0C\u7136\u540E\u628A\u6587\u4EF6\u5730\u5740\u4FDD\u5B58\u5728\u6570\u636E\u5E93\u91CC\u9762\u3002\u4E5F\u53EF\u4EE5\u5728\u672C\u5730\u76F4\u63A5\u4E0A\u4F20\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF0C\u5982\u679C\u4F60\u91C7\u7528\u8FD9\u4E2A\u65B9\u5F0F\uFF0C\u90A3\u4E48\u4F60\u5E94\u8BE5\u5728koa\u91CC\u9762\u5728\u52A0\u5165\u4E00\u4E2A\u5904\u7406file\u8BF7\u6C42\u7684\u4E2D\u95F4\u4EF6\u3002</p>
<p>\u4E5F\u53EF\u4EE5\u501F\u52A9\u7B2C\u4E09\u65B9\u7684\u5B58\u50A8\uFF0C\u6BD4\u5982\u6211\u5728\u6211\u7684\u535A\u5BA2\u91CC\u9762\u5199\u4E86\u4E00\u4E2A\u63A5\u53E3\u5C31\u662F\u76F4\u63A5\u5728\u5BA2\u670D\u7AEF\u4E0A\u4F20\u6587\u4EF6\u5230\u4E03\u725B\u4E91\uFF0C\u7136\u540E\u4E03\u725B\u4E91\u8FD4\u56DE\u7ED9\u6211\u94FE\u63A5\u3002\u5F53\u65F6\u4E4B\u6240\u4EE5\u91C7\u7528\u8FD9\u4E2A\u64CD\u4F5C\u662F\u56E0\u4E3A\uFF0C\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u592A\u6162\u4E86\uFF0C\u501F\u52A9\u7B2C\u4E09\u65B9\u52A0\u8F7D\u56FE\u7247\u4F1A\u5FEB\u5F88\u591A\u3002</p>
<h3>\u5173\u4E8E\u9879\u76EE\u7684\u670D\u52A1\u5668\u90E8\u7F72</h3>
<p>\u56E0\u4E3Avue\u7684\u7B80\u5355\uFF0C\u5F88\u591A\u90FD\u53EA\u77E5\u9053<code>npm install</code> \u548C <code>npm run dev</code> \u6240\u4EE5\u6709\u5F88\u591A\u4EBA\u4F1A\u6709\u7591\u95EE\uFF0C\u90A3\u5C31\u662F\u6211\u8FD9\u4E2Avue\u9879\u76EE\u5982\u4F55\u90E8\u7F72\u5728\u670D\u52A1\u5668\u4E0A\u9762\uFF1F\u96BE\u9053\u662F\u628A\u4EE3\u7801\u4E0A\u4F20\u5230\u670D\u52A1\u5668\u4E0A\u9762\u6765\u6267\u884C\u4E0A\u97622\u6761\u547D\u4EE4\u5417\uFF1F</p>
<p>\u5176\u5B9E\u8FD9\u4E2A\u95EE\u9898\u662F\u7531\u4E8E\u5927\u5BB6\u53EA\u4F1A\u673A\u68B0\u5F0F\u64CD\u4F5C\u7559\u4E0B\u7684\uFF0C\u56E0\u4E3Avue-cli\u7684\u7B80\u5355\u65B9\u4FBF\u5DF2\u7ECFmvvm\u6846\u67B6\u7684\u5389\u5BB3\uFF0C\u6211\u4EEC\u5FD8\u8BB0\u4E86\u6211\u4EEC\u5199\u7684\u4E1C\u897F\u672C\u5B50\u4E0A\u8FD8\u662F\u7F51\u9875\u3002\u6240\u4EE5\u6211\u4EEC\u9700\u8981\u7528<code>webpack</code> \u5C06\u6211\u4EEC\u7684\u9879\u76EE\u6253\u5305\u4E00\u4E0B\u5728\u547D\u4EE4\u884C\u91CC\u9762\u6267\u884C<code>npm run build</code> \u5C06\u6211\u4EEC\u5199\u7684vue\u548Cjs\u4EE3\u7801\u4EE5\u53CA\u5176\u4ED6\u7684\u8D44\u6E90\u6587\u4EF6\uFF0C\u6253\u5305<code>/dist</code>\u91CC\u9762\u3002\u8FD9\u91CC\u9762\u7684\u6587\u4EF6\u5C31\u662F\u6211\u4EEC\u5199\u7684\u7F51\u9875\uFF0C\uFF0C\u6211\u4EEC\u53EA\u9700\u8981\u5427\u8FD9\u91CC\u9762\u7684\u6587\u4EF6\u4E0A\u4F20\u5230\u670D\u52A1\u5668\u4E0B\u5C31\u53EF\u4EE5\u8FD0\u884C\u4E86\u3002</p>
<p>\u8FD9\u91CC\u5173\u4E8E\u628A\u6253\u5305\u51FA\u6765\u7684\u6587\u4EF6\u5F80\u5F80\u4F1A\u67092\u65B9\u5F0F\u8FD0\u884C\uFF1A</p>
<ol>
<li>\u5C06\u6587\u4EF6\u4E22\u5230<code>server/public</code> \u6587\u4EF6\u5939\u4E0B\u9762\uFF0C\u56E0\u4E3A\u6211\u4EEC\u5728<code>server/app.js</code>\u4E0B\u9762\u914D\u7F6E\u4E86\u9759\u6001\u6587\u4EF6\u76EE\u5F55\uFF0C\u7136\u540E\u6211\u4EEC\u542F\u52A8\u670D\u52A1\u7AEF\u3002\u5C31\u53EF\u4EE5\u5728<code>127.0.0.1:7778/index.html</code>(\u5047\u8BBE\u670D\u52A1\u5668\u7AEF\u53E3\u53F7\u662F7778)\u770B\u5230\u6211\u4EEC\u7684\u7F51\u9875\u3002</li>
<li>\u7528nginx\u670D\u52A1\u5668\u4EE3\u7406 \uFF0C\u9759\u6001\u6587\u4EF6\u7528nginx\u6258\u7BA1\uFF0C\u7136\u540E\u8BBE\u7F6E\u8F6C\u53D1\u7684\u65B9\u5F0F\u6765\u83B7\u53D6api\u8BF7\u6C42\u6570\u636E\u3002</li>
</ol>
<p>\u5176\u5B9E\u7B2C\u4E00\u79CD\u7684\u8BDD\u4E5F\u662F\u501F\u52A9\u4E0Enodejs\u4F1A\u81EA\u52A8\u542F\u52A8\u4E00\u4E2A\u670D\u52A1\u5668\uFF0C\u8FDB\u884C\u9759\u6001\u6587\u4EF6\u7684\u6258\u7BA1\u3002\u6211\u4E2A\u4EBA\u6BD4\u8F83\u559C\u6B22\u7B2C\u4E8C\u79CD\u65B9\u6CD5\uFF0C\u4E0B\u9762\u6211\u4EEC\u5C31\u8FDB\u884C\u8FD9\u79CD\u6587\u4EF6\u7684\u914D\u7F6E\u3002</p>
<p>\u5F00\u59CB\u4E4B\u524D\uFF0C\u4F60\u5E94\u8BE5\u68C0\u67E5\u4F60\u7684\u670D\u52A1\u5668\u662F\u5426\u5B89\u88C5\u6709<code>nginx</code>\u4E0E<code>pm2</code></p>
<pre><code class="language-bash">$ pm2 -v
$ nginx -v
</code></pre>
<p>\u5982\u679C\u6B63\u786E\u51FA\u73B0\u7248\u672C\u53F7\uFF0C\u90A3\u4E48\u5C31\u5DF2\u7ECF\u5B89\u88C5\u4E86\uFF0C\u5982\u679C\u6CA1\u6709\u7684\u8BDD\uFF0C\u8BF7\u8C37\u6B4C\u5B89\u88C5\u3002<code>pm2</code>\u7684\u4F5C\u7528\u662F\u8FDB\u884C\u8FDB\u7A0B\u5B88\u62A4\uFF0C\u5F53\u4F60\u7684nodejs\u610F\u5916\u7684\u505C\u6B62\u7684\u65F6\u5019\uFF0C\u8FDB\u884C\u91CD\u542F\u3002</p>
<p>\u5982\u679C\u6211\u4EEC\u6709\u57DF\u540D\u7684\u8BDD\uFF0C\u6211\u4EEC\u73B0\u5728\u57DF\u540D\u5546\u54EA\u91CC\u6DFB\u52A0\u4E00\u4E2A\u4E8C\u7EA7\u57DF\u540D\u89E3\u6790\u3002\u8FD9\u91CC\u6DFB\u52A0\u5B8C\u89E3\u6790\u4EE5\u540E\u4F1A\u8981\u51E0\u5206\u949F\u7684\u7B49\u5F85\u65F6\u95F4</p>
<p><div class="image-block"><img src="/loading.png" alt="\u6DFB\u52A0\u57DF\u540D\u89E3\u6790" class="image" data-src="https://image.lcylove.cn/165eb6463fe_6d6fc408"><p class="image-title">\u6DFB\u52A0\u57DF\u540D\u89E3\u6790</p></div></p>
<p>\u7136\u540E\uFF0C\u6211\u4EEC\u627E\u5230nginx\u7684\u914D\u7F6E\u6587\u4EF6<code>nginx.conf</code> \u5728\u91CC\u9762\u52A0\u5165\uFF1A</p>
<pre><code>server {
        listen 80;
        server_name demo.lcylove.cn;
        root   /data/www/demo; 
        index  index.html index.htm index.php;

        location /api/ {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $http_host;
            proxy_pass https://127.0.0.1:7778;
        }
    }
</code></pre>
<p>\u6CE8\u610F\uFF1A <code>location /api/</code> \u8FD9\u91CC\u8BF4\u660E\u53EA\u6709api/*\u7684\u8BF7\u6C42\u624D\u4F1A\u8FDB\u884C\u8F6C\u53D1\u3002</p>
<p>\u7136\u540E\u8FDB\u884Cnginx\u670D\u52A1\u5668\u7684\u91CD\u542F\uFF1A<code>nginx -s reload</code></p>
<p>\u6211\u4EEC\u628Aserver\u7684\u4EE3\u7801\u653E\u5728\u670D\u52A1\u5668\u4E0B\uFF0C\u901A\u8FC7\u547D\u4EE4\u884C\u79FB\u5230\u76F8\u5E94\u4F4D\u7F6E\u6267\u884C\u547D\u4EE4\uFF1A</p>
<pre><code class="language-bash">$ npm install && cnpm i
$ pm2 start --name demo1 npm -- run start
</code></pre>
<p>\u542F\u52A8\u6211\u4EEC\u7684nodejs\u670D\u52A1\u5668\u3002\u7136\u540E\u6211\u4EEC\u5C31\u53EF\u4EE5\u6253\u5F00\u7F51\u7AD9 <a href="https://demo.lcylove.cn" class="link" target="_blank" rel="noopener">demo.lcylove.cn</a> \u67E5\u770B\u6548\u679C</p>
<h2>\u6700\u540E</h2>
<p>\u7531\u4E8E\u672C\u4EBA\u624D\u758F\u5B66\u6D45\uFF0C\u5982\u679C\u6709\u4EFB\u4F55\u95EE\u9898\u7684\u6B22\u8FCE\u4E0B\u9762\u7559\u8A00\u8BA8\u8BBA\uFF01</p>
`}})}});export{c as default};
