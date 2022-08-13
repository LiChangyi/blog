import{_ as e}from"./index.vue_vue_type_script_setup_true_lang.4f7cfb50.js";import{d as o,k as n}from"./app.736fae21.js";import"./constant.e4efd1a3.js";const s=o({setup(){return()=>n(e,{article:{path:"hello-react",title:"\u62E5\u62B1React",desc:"\u4E00\u4E2A\u5B66\u4E602\u5E74\u524D\u7AEF\uFF0C\u4ECE\u5200\u8015\u706B\u79CD\u7684html+css+js\u5230vue\u518D\u5230\u73B0\u5728\u7684react\u5FC3\u7406\u53D8\u5316\u8FC7\u7A0B\u3002\u4EE5\u53CA\u521D\u5B66react\u9047\u5230\u7684\u4E00\u4E9B\u5C0F\u95EE\u9898",createAt:"2018.11.13",tag:["React","JS"],classify:"Code",content:`<h2>\u6211\u4E3A\u4EC0\u4E48\u5B66\u4E60react</h2>
<blockquote>
<p>\u4ECE\u5927\u4E00\u5F00\u59CB\u5B66\u4E60\u524D\u7AEF\u5DF2\u7ECF2\u5E74\u591A\u4E86\uFF0C\u4ECE\u4E00\u5F00\u59CB\u5B66\u4E60\u524D\u7AEF\u5C31\u5341\u5206\u7684\u4E0D\u559C\u6B22\u7528\u522B\u4EBA\u7684\u5E93\uFF0C\u6240\u4EE5\u5F53\u4ED6\u4EEC\u7528\u7740jQuery\u548Cbootstrap\u7684\u65F6\u5019\u6211\u8FD8\u5728\u7528\u7740css\u6162\u6162\u5E03\u5C40\u548C\u539F\u751FJS\u53BB\u64CD\u4F5CDOM\u6765\u5B9E\u73B0\u6548\u679C\uFF0C\u867D\u7136\u611F\u89C9\u5199\u4EE3\u7801\u7684\u901F\u5EA6\u5341\u5206\u7684\u6162\uFF0C\u4F46\u662F\u5185\u5FC3\u662F\u5341\u5206\u5F00\u5FC3\u7684\uFF0C\u56E0\u4E3A\u6211\u53EA\u7528\u4E86w3c\u63D0\u4F9B\u7684\u6807\u51C6api\u3002\u8FD9\u6837\u80FD\u8BA9\u6211\u5B66\u5230\u66F4\u591A\u7684\u77E5\u8BC6\u3002\u6240\u4EE5\u6211\u7684\u5185\u5FC3\u662F\u66F4\u559C\u6B22\u7528\u57FA\u7840\u7684\u4E1C\u897F\uFF0C\u6700\u4EAB\u53D7\u6240\u6709\u7684\u4EE3\u7801\u90FD\u662F\u6211\u4E00\u4E2A\u4EBA\u5199\u7684\u3002</p>
</blockquote>
<p>\u5927\u4E8C\u4E0B\u4E86\uFF0C\u4E0D\u51C6\u5907\u8003\u7814\uFF0C\u5FC5\u987B\u8981\u4E3A\u5927\u4E09\u51FA\u53BB\u5DE5\u4F5C\u505A\u8003\u8651\uFF0C\u6240\u4EE5\u5B66\u4E60\u4E00\u95E8\u73B0\u5728\u6D41\u884C\u7684\u6846\u67B6\u4F3C\u4E4E\u662F\u5FC5\u987B\u7684(\u56E0\u4E3A\u62C9\u94A9\u7F51\u4E0A\u524D\u7AEF\u7684\u62DB\u8058vue/react/ng \u5DF2\u7ECF\u9876\u66FF\u4E86jq\u7684\u5730\u4F4D\uFF0C\u6210\u4E86\u524D\u7AEF\u5FC5\u4F1A\u7684\u4E00\u4E2A\u6280\u672F)\u3002\u6240\u4EE5\uFF0C\u57283\u6708\u4EFD\u5F00\u59CB\u63A5\u89E6\u4E86vuejs\uFF0C\u8FD9\u91CC\u4E3A\u4EC0\u4E48\u9009\u62E9vuejs\u5450\uFF0C\u56E0\u4E3A\u7F51\u4E0A\u5173\u4E8E\u5B66\u4E60vue\u7684\u6559\u7A0B\u662F\u771F\u7684\u591A\uFF0C\u8BBA\u575B\u4E0A\u9762\u5F88\u591A\u4EBA\u90FD\u518D\u8BF4vue\u5F88\u7B80\u5355\uFF0C\u5176\u6B21\u6700\u91CD\u8981\u7684\u662Fvue\u7684\u4F5C\u8005\u5C24\u5927\u662F\u4E2D\u56FD\u4EBA\uFF0C\u6BCF\u4E2A\u4EBA\u90FD\u6709\u4E00\u4E2A\u7231\u56FD\u60C5\u6000\uFF0C\u6240\u4EE5vue\u6210\u4E86\u6211\u7684\u9996\u9009\u3002\u9996\u5148\u4E0D\u5F97\u4E0D\u8BF4vue\u771F\u7684\u5F88\u7B80\u5355\uFF0C\u6211\u5B66vue\u8DDF\u7740\u5B98\u7F51\u770B\uFF0C\u7136\u540E\u8BD5\u7740\u5B8C\u6210\u4E86\u4E00\u4E2AToDo\u7A81\u7136\u53D1\u73B0\u6211\u5199\u4EE3\u7801\u7684\u901F\u5EA6\u8F83\u4EE5\u524D\u5927\u5927\u7684\u63D0\u9AD8\u3002\u8FD9\u91CC\u4E0D\u5F97\u4E0D\u7ED9vue\u7684\u5B98\u7F51\u70B9\u4E2A\u8D5E\uFF0C\u6559\u7A0B\u662F\u6211\u770B\u8FC7\u6700\u597D\u7684\u4E2D\u6587\u6559\u7A0B(\u56E0\u4E3A\u82F1\u8BED\u4E0D\u597D\u7684\u7F18\u6545\uFF0C\u6BCF\u6B21\u5B66\u4E60\u65B0\u4E1C\u897F\u770B\u7684\u90FD\u662F\u4E2D\u6587\u5B98\u7F51\uFF0C\u4F46\u662F\u6709\u4E9B\u4E2D\u6587\u7FFB\u8BD1\u771F\u7684\u592A\u70C2\u4E86\uFF0C\u53CD\u6B63\u6211\u662F\u4E0D\u80FD\u7406\u89E3)
\u200B	\u6BCF\u5929\u770B\u770Bvue\u5B98\u7F51\u770B\u7740api\uFF0C\u7136\u540E\u5728github\u4E0A\u9762\u641C\u7D22\u522B\u4EBA\u5199\u5B8C\u7684\u4F18\u79C0vue\u9879\u76EE\uFF0C\u6162\u6162\u7684\u5145\u5B9E\u7740\u81EA\u5DF1\uFF0C\u63D0\u9AD8\u81EA\u5DF1\u7684\u6280\u672F\u3002\u4F3C\u4E4E\u4E8B\u60C5\u4E00\u5207\u90FD\u5728\u5411\u597D\u7684\u65B9\u5411\u53D1\u5C55\u3002
\u968F\u7740\u5728\u4ECA\u5E74\u6691\u5047\uFF0C\u6211\u7528vue\u642D\u5EFA\u4E86\u4E00\u4E2A\u7ED9\u5927\u4E00\u540C\u5B66\u7684\u9009\u8BFE\u7CFB\u7EDF\u5F53\u65F6\u7528\u4E86<code>vue+koa+MongoDB</code> \u867D\u7136\u505A\u7684\u662F\u4E00\u4E2A\u5F88\u7B80\u5355\u7684\u4E1C\u897F\uFF0C\u4F46\u662F\u8FD8\u662F\u53D1\u73B0\u4E86vue\u7684\u4E00\u4E9B\u4E0D\u8DB3\u3002\u6BD4\u5982\u6570\u7EC4\u6216\u8005\u5BF9\u8C61\u7684\u6DF1\u5C42\u5D4C\u5957\u6570\u636E\u4E0D\u80FD\u54CD\u5E94\uFF0C\u5DF2\u7ECF\u867D\u7136\u6A21\u677F\u6307\u4EE4\u7ED9\u6211\u4EEC\u5F00\u53D1\u63D0\u4F9B\u4E86\u4FBF\u5229\uFF0C\u4F46\u662F\u5728\u9762\u5BF9\u590D\u6742\u7684\u60C5\u51B5(\u53EF\u80FD\u662F\u4E00\u4E2A\u7B80\u5355\u9879\u76EE\u88AB\u6211\u641E\u590D\u6742\u4E86)v\u2013\u6307\u4EE4\u4E0D\u597D\u7528\uFF0C\u7136\u540E\u4E0D\u5F97\u4E0D\u81EA\u5DF1\u7528\u539F\u751FJS\u6765\u5B9E\u73B0\u81EA\u5B9A\u4E49\u6307\u4EE4\uFF0C\u4F46\u662F\u53D1\u73B0\u81EA\u5B9A\u4E49\u6307\u4EE4\u4E0D\u80FD\u4E0Evue\u4E2D\u7684data\u901A\u4FE1\uFF0C\u5F53\u65F6\u5FC3\u91CC\u771F\u662F\u4E00\u4E07\u5339\u8349\u6CE5\u9A6C\u8DD1\u8FC7(\u867D\u7136vue\u4E5F\u652F\u6301\u5199<code>jsx</code>\u8BED\u6CD5\u4F46\u662F\u6CA1\u6709\u53BB\u8BD5\u8FC7,\u5E0C\u671B\u540E\u9762\u518D\u53BB\u8BD5\u8BD5)\u3002\u867D\u7136\u6709\u4E00\u4E9B\u4E0D\u8DB3\uFF0C\u4F46\u662F\u6BD5\u7ADF\u4E5F\u5B66\u4E86\u5927\u534A\u5E74\u4E86\uFF0C\u8FD8\u662F\u5FCD\u4E86\u5FCD\u628A\u4EE3\u7801\u64B8\u51FA\u6765\u4E86\u3002
\u5728\u6691\u5047\u7684\u6700\u540E\u4E00\u4E2A\u6708\uFF0C\u56E0\u4E3A\u524D\u9762\u4E00\u76F4\u6709\u60F3\u642D\u5EFA\u4E00\u4E2A\u4E2A\u4EBA\u535A\u5BA2\u7684\u60F3\u6CD5\u6240\u4EE5\u7528\u7EE7\u7EED\u7528<code>vue+koa+MongoDB</code>\u642D\u5EFA\u4E86\u4E2A\u4EBA\u7684\u535A\u5BA2\uFF0C\u53C8\u7B97\u662F\u518D\u6B21\u719F\u6089vue\u548Ckoa\u7684\u8BED\u6CD5\u5427\u3002\u4E00\u5207\u90FD\u8FD8\u5F88\u987A\u5229\u7684\uFF0C\u56E0\u4E3A\u524D\u9762\u5199\u8FC7\u7684\u9879\u76EE\u91CC\u9762\u6709\u5F88\u591A\u4EE3\u7801\u53EF\u4EE5\u590D\u7528\uFF0C<code>ctrl+c ctrl+v</code> \u7684\u5F00\u53D1\u6A21\u5F0F\uFF0C\u867D\u7136\u5F00\u53D1\u5F88\u5FEB\uFF0C\u4F46\u662F\u6211\u5FC3\u4E2D\u662F\u5341\u5206\u4E0D\u723D\u7684\uFF0C\u867D\u7136\u53CA\u5176\u7684\u60F3\u8981\u53BB\u6539\u53D8\uFF0C\u4F46\u662F\u53C8\u60F3\u5077\u61D2\u8FD9\u662F\u5341\u5206\u77DB\u76FE\u7684\u3002</p>
<p>\u200B	\u5927\u4E09\u5F00\u5B66\u4E86\uFF0C\u56E0\u4E3A\u8FD92\u5E74\u4E00\u76F4\u6CA1\u6709\u53C2\u52A0\u4EC0\u4E48\u6BD4\u8D5B\u6216\u8005\u4E00\u4E9B\u8001\u5E08\u9879\u76EE\uFF0C\u6240\u4EE5\u5982\u679C\u540E\u9762\u586B\u5199\u7B80\u5386\uFF0C\u9879\u76EE\u7ECF\u9A8C\u54EA\u91CC\u4F1A\u8BA9\u6211\u5341\u5206\u7684\u96BE\u582A\uFF0C\u6240\u4EE5\u8BA1\u5212\u5728\u8FD9\u4E00\u5B66\u671F\u4E89\u53D6\u5728\u505A2\u4E2A\u5B8C\u6574\u7684\u4E1C\u897F\uFF0C\u4E0D\u7136\u5927\u4E09\u51FA\u53BB\u5B9E\u4E60\u4F1A\u5F88\u96BE\u53D7\u3002\u6240\u4EE5\u5C31\u5F00\u59CB\u9009\u62E9\u505A\u4EC0\u4E48\uFF0C\u6240\u5E78\u5B66\u6821\u5F00\u4E86<code>python</code>\u8BFE\uFF0C\u8001\u5E08\u8981\u6C42\u6700\u540E\u8BFE\u7A0B\u8BBE\u8BA1\u9700\u8981\u4E00\u4E2Apython\u7684\u4E1C\u897F\uFF0C\u6211\u521D\u6B65\u7684\u6253\u7B97\u662F\u7528vue\u505A\u524D\u53F0\uFF0C\u7136\u540E\u52A0\u4E0A<code>python\u7684flask\u6846\u67B6</code>\u548C\u4EE5\u524D\u5B66\u8FC7\u4E00\u70B9\u70B9\u7684<code>mysql</code>\u6765\u505A\u4E00\u4E2A\u4E0A\u8BFE\u7BA1\u7406\u7684\u9879\u76EE\uFF0C\u4E3B\u8981\u5305\u62EC\u8BFE\u5802\u7684\u70B9\u540D\u548C\u8001\u5E08\u4F5C\u4E1A\u7684\u5E03\u7F6E\u4E00\u4E2AwebApp\u3002\u5F53\u6211\u6B63\u5E38\u7684\u6253\u5F00\u547D\u4EE4\u884C\u8F93\u5165<code>vue create demo</code> <code>npm run serve</code>  <code>code .</code> \u770Bapi\uFF0C\u8BB0\u4F4F\u6307\u4EE4\uFF0C\u53D1\u73B0\u6211\u5DF2\u7ECF\u517B\u6210\u4E86\u5B9A\u52BF\u7684\u662F\u601D\u7EF4\uFF0C\u6D3B\u6210\u4E86\u6700\u8BA8\u538C\u7684\u81EA\u5DF1\u3002\u6211\u53D1\u73B0\u6211\u5199\u7684\u4E0D\u662F\u4EE3\u7801\uFF0C\u6211\u5DF2\u7ECF\u4E0D\u662F\u4E00\u4E2A\u7A0B\u5E8F\u5458\uFF0C\u6211\u6D3B\u6210\u4E86\u4E00\u4E2A\u7801\u519C\uFF0C\u53EA\u4F1A\u4EE3\u7801\u7684\u7C98\u8D34\u590D\u5236\u3002</p>
<p>\u200B	\u7136\u540E\u6211\u6709\u4E0D\u7981\u7684\u95EE\u81EA\u5DF1\uFF0C\u81EA\u5DF1\u771F\u7684\u559C\u6B22\u8FD9\u6A21\u5F0F\u5417\uFF0C\u559C\u6B22\u8FD9\u79CD<code>ctrl+c ctrl+v</code> \u7684\u5F00\u53D1\u6A21\u5F0F\u5417\uFF1F\u7B54\u6848\u662F\u5426\u5B9A\u7684\uFF0C\u867D\u7136\u8FD9\u79CD\u5F00\u53D1\u7684\u786E\u5F88\u5FEB\uFF0C\u4F46\u662F\u673A\u68B0\u5F0F\u7684\u64B8\u5417\uFF0C\u91CD\u590D\u7684\u4EE3\u7801\u6162\u6162\u7684\u6211\u4F1A\u611F\u5230\u65E0\u8DA3\u3002\u6240\u4EE5\u6211\u89C9\u5F97\u5148\u628A\u9879\u76EE\u653E\u4E00\u653E\uFF0C\u770B\u770B\u522B\u7684\u4E1C\u897F\uFF0C\u6211\u4E13\u6CE8\u770B\u4E86\u770B\u4E00\u4E2A\u7B80\u5355<code>mvvm</code>\u7684\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u770B\u4E86\u4E00\u4E9B<code>webpack</code>\u57FA\u7840\uFF0C\u7136\u540E\u8FD8\u662F\u662F\u8FF7\u832B\uFF0C\u524D\u7AEF\u5440\uFF0C\u5230\u5E95\u5E94\u8BE5\u5B66\u4EC0\u4E48\uFF1F\u603B\u611F\u89C9\u4E0A\u4E86\u8FD9\u6761\u8D3C\u8239\uFF0C\u7136\u540E\u4E0B\u4E0D\u53BB\uFF0C\u4E5F\u4E0A\u4E0D\u4E86\u5CB8\u3002\u6211\u540E\u6765\u51B3\u5B9A\uFF0C\u53BB\u770B\u770B<code>react</code>\uFF0C\u56E0\u4E3A\u7F51\u4E0A\u5173\u4E8E<code>vue</code>\u548C<code>react</code>\u7684\u6BD4\u8F83\u8FD8\u662F\u7279\u522B\u7684\u591A\uFF0C\u6211\u60F3\u53BB\u770B\u770B<code>react</code>\u4E3A\u4EC0\u4E48\u503C\u5F97\u522B\u4EBA\u8FD9\u4E48\u7684\u80AF\u5B9A(\u56E0\u4E3A\u6211\u8BA4\u4E3Avue\u5DF2\u7ECF\u505A\u5F97\u975E\u5E38\u597D\u4E86)\uFF0C\u5176\u6B21\u5C31\u662F\u6211\u76F8\u5BF9\u6211\u7684\u535A\u5BA2\u8FDB\u884C\u4E00\u4E2A\u91CD\u6784\uFF0C\u56E0\u4E3A\u4EE5\u524D\u662F\u624D\u7528\u5355\u9875\u5E94\u7528\uFF0CSEO\u6709\u5F88\u5927\u7684\u95EE\u9898\uFF0C\u6211\u60F3\u89E3\u51B3\u4ED6\uFF0C\u867D\u7136vue\u9875\u6E38NUXT\u4E5F\u6709<code>vue-server-renderer</code>\uFF0C\u4F46\u662F\u6211\u5C31\u662F\u60F3\u7528react\uFF0C\u4E5F\u6709\u53EF\u80FD\u662F\u65E5\u540E\u60F3\u5C1D\u8BD5\u4E00\u4E0B<code>react native</code>\u3002</p>
<h2>\u521D\u8BC6React</h2>
<p>\u200B	\u6211\u4E2A\u4EBA\u5B66\u4E60\u4E00\u4E2A\u65B0\u7684\u4E1C\u897F\u7684\u4E60\u60EF\u662F\uFF0C\u5148\u770B\u89C6\u9891\u3002\u56E0\u4E3A\u6211\u8BA4\u4E3A\u4F60\u521A\u5F00\u59CB\u5B66\u4E00\u4E2A\u4E1C\u897F\uFF0C\u4EC0\u4E48\u90FD\u4E0D\u77E5\u9053\uFF0C\u4E5F\u4E0D\u77E5\u9053\u6587\u4EF6\u5982\u4F55\u5EFA\uFF0C\u4EE3\u7801\u5982\u4F55\u5199\u3002\u6240\u4EE5\u5728B\u7AD9\u4E0A\u9762\u770B\u4E86\u67D0\u8BFE\u7684\u76D7\u7248<code>react \u5B9E\u73B0\u4E00\u4E2A\u7B80\u4E66</code>(\u7B49\u6211\u6709\u94B1\u4E86\u4E00\u5B9A\u652F\u6301\u6B63\u7248)\uFF0C\u770B\u770B\u524D\u9762\u51E0\u7AE0\u57FA\u672C\u4E0A\u4E86\u89E3\u4E86react\u7684\u57FA\u672C\u8BED\u6CD5\uFF0C\u7136\u540E\u6211\u6253\u5F00\u4E86react\u7684\u5B98\u7F51(\u5F53\u7136\u8FD9\u91CC\u80AF\u5B9A\u6307\u7684\u662F\u4E2D\u6587\u5B98\u7F51\uFF0C\u56E0\u4E3A\u524D\u9762\u63D0\u8FC7\u82F1\u8BED\u5F88\u5DEE\u6CA1\u529E\u6CD5)\u3002\u7136\u540E\u53D1\u73B0react\u7684\u4E2D\u6587\u5B98\u7F51\u548Cvue\u7684\u5B98\u7F51\u771F\u7684\u76F8\u5DEE\u5F88\u8FDC\u3002\u53D1\u73B0\u770B\u4E86\u8FD8\u662F\u6709\u4E00\u4E9B\u4E1C\u897F\u4E0D\u662F\u5F88\u6E05\u695A\uFF0C\u5199\u7684\u4E0D\u6E05\u4E0D\u767D\u7684\uFF0C\u7136\u540E\u4E0D\u5F97\u4E0D\u53BBgithub\u770B\u4ED6\u63D0\u4F9B\u7684demo\u6E90\u7801\u3002\u7136\u540E\u4E0D\u65AD\u7684\u5B66\u4E60\uFF0C\u4E0D\u65AD\u7684\u5199\u9879\u76EE\uFF0C\u4E0D\u65AD\u7684\u5728\u6398\u91D1\u4E0A\u770B\u770B\u5927\u4F6C\u4EEC\u5206\u4EAB\u7684react\u7684\u6587\u7AE0\u3002\u56E0\u4E3A\u4E2A\u4EBA\u89C9\u5F97\u539F\u751Fjs\u80FD\u529B\u548Ces6\u7684\u8BED\u6CD5\u8FD8\u884C\u52A0\u4E0A\u4EE5\u524D\u5B66\u4E60\u8FC7vue\uFF0C\u6709\u4E00\u5B9A\u7684\u7EC4\u4EF6\u5316\u601D\u7EF4\u6240\u4EE5\u5B66\u4E60\u8D77\u6765\u8FD8\u662F\u6BD4\u8F83\u5FEB\u7684\u3002</p>
<p>\u200B	\u7528vue\u548Creact\u7684\u7B2C\u4E00\u4E2A\u9879\u76EE\u80AF\u5B9A\u662F<code>Todo</code>\u5C31\u548C\u5B66\u4E60\u7F16\u7A0B\u8BED\u8A00\u4E00\u6837\uFF0C\u7B2C\u4E00\u4E2A\u5C0F\u7A0B\u5E8F\u80AF\u5B9A\u662F<code>hello world</code>\u3002\u6240\u4EE5\u4E5F\u662F\u51C6\u5907\u7528react\u505A\u4E00\u4E2ATodo\uFF0C\u4E0D\u505A\u4E0D\u77E5\u9053\uFF0C\u4E00\u505A\u53D1\u73B0\u95EE\u9898\u771F\u7684\u5F88\u591A\uFF0C\u6211\u7F57\u5217\u4E00\u4E9B\u5982\u679C\u4F60\u662Fvue\u8F6C\u5230react\u6700\u4E0D\u5BB9\u6613\u63A5\u53D7\u7684\u51E0\u4E2A\u4E1C\u897F\uFF1A</p>
<ol>
<li>
<p>\u7B2C\u4E00\u4E2A\u662F<code>input</code>\u8F93\u5165\u6846\u6570\u636E\u7684\u7ED1\u5B9A\uFF0C\u5728vue\u91CC\u9762\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528<code>v-model</code>\u5C31\u53EF\u4EE5\u5B9E\u73B0\uFF0C\u4F46\u662F\u5728react\u91CC\u9762\u6CA1\u6709\u6307\u4EE4\u7684\u6982\u5FF5\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5199\u6210<code>value={\u53D8\u91CF}</code> \u8FD9\u91CC\u7684\u53D8\u91CF\u5FC5\u987B\u5728class\u7684<code>constructor</code>\u91CC\u9762\u58F0\u660E\uFF0C\u6240\u4EE5\u8FD9\u91CC\u7684\u53D8\u91CF\u540D\u5B57\u5199\u7684\u5F88\u957F<code>this.state.xxx</code>\u548Cvue\u91CC\u9762\u53EA\u5199<code>xxx</code>\u611F\u89C9\u9875\u9762\u5F88\u4E71\u3002</p>
</li>
<li>
<p>\u672C\u4EE5\u4E3A\u6211\u628A\u6570\u636E\u7ED9input\u8F93\u5165\u6846\u7ED1\u5B9A\u4E86\u6570\u636E\u4FBF\u6CA1\u4E8B\u4E86\uFF0C\u7136\u540E\u6253\u5F00\u4E86\u9875\u9762\uFF0C\u53D1\u73B0\u8F93\u5165\u6570\u636E\uFF0Cinput\u8F93\u5165\u6846\u4E0D\u80FD\u66F4\u65B0\uFF0CWTF\uFF0C\u6253\u5F00\u63A7\u5236\u53F0\uFF0C\u4E3A\u4EC0\u4E48\u63A7\u5236\u53F0\u4F1A\u62A5\u9519\uFF1F\u8BF4\u4EC0\u4E48\u6211\u6CA1\u6709\u7ED1\u5B9AonChange\u4E8B\u4EF6\u3002\u6211\u8BB0\u5230\u4EE5\u524D\u6211\u5199vue\u7684\u65F6\u5019\u597D\u50CF\u6CA1\u8FD9\u4E00\u6B65\u5440\uFF0C\u7B97\u4E86\u7528\u522B\u4EBA\u7684\u4E1C\u897F\u8FD8\u662F\u5411\u522B\u4EBA\u59A5\u534F\u628A\uFF0C\u8BF4\u6211\u6CA1\u6709onChange\u4E8B\u4EF6\uFF0C\u6211\u5C31\u52A0\u4E00\u4E2AonChange\u4E8B\u4EF6\u5427\u3002\u7136\u540E\u6309\u7167\u7F51\u4E0A\u7ED9\u7684\u6559\u7A0B\uFF0C\u7ED1\u5B9A\u4E86\u4E00\u4E0B\u3002\u5728\u6253\u5F00\u53D1\u73B0\u62A5<code>this</code>\u7684\u9519\u8BEF\uFF0C\u8FD9\u53C8\u662F\u4EC0\u4E48\u56DE\u4E8B\u5440\uFF0C\u611F\u89C9\u8981\u5D29\u6E83\uFF0C\u751A\u81F3\u90FD\u60F3\u5220\u9664\u6587\u4EF6\u7136\u540E\u4E13\u5FC3\u5B66\u4E60\u6211\u7684vue\u53BB\u4E86\u3002\u4F46\u662F\u8FD8\u662F\u6700\u540E\u60F3\u4E86\u60F3\uFF0C\u5FCD\u4E86\u4E00\u5FCD\uFF0C\u5B66\u524D\u7AEF\u7684\u4EBA\uFF0C\u4E00\u5B9A\u8981\u5FCD\u3002\u7136\u540E\u53C8\u53BB\u7ED1\u5B9Athis\u6307\u9488\uFF0C\u8FD9\u91CC\u5F88\u7B80\u5355\uFF0C\u7528js\u91CC\u9762\u7684<code>bind</code>\u51FD\u6570\u5C31\u80FD\u5B9E\u73B0\uFF0C\u5982\u679C\u4F60js\u80FD\u529B\u4E0D\u884C\uFF0C\u80AF\u5B9A\u4E5F\u5F88\u61F5\u903Cbind\u662F\u505A\u4EC0\u4E48\u7684\uFF0C\u5F53\u7136\u4E5F\u53EF\u4EE5\u7528\u7BAD\u5934\u51FD\u6570\u3002\u6BD4\u8D77\u7528bind\u6765\u7ED1\u5B9Athis\uFF0C\u6211\u66F4\u559C\u6B22\u7528\u7BAD\u5934\u51FD\u6570</p>
<pre><code class="language-javascript"><span class="token comment">// vue</span>
<span class="token operator">&lt;</span>input v<span class="token operator">-</span>model<span class="token operator">=</span>value<span class="token operator">></span>
<span class="token comment">// react</span>
<span class="token operator">&lt;</span>input value<span class="token operator">=</span><span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>value <span class="token punctuation">}</span> onChange<span class="token operator">=</span><span class="token punctuation">{</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleChange</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span>
<span class="token comment">// \u611F\u89C9vue\u7B80\u5355\u7684\u4E0D\u662F\u4E00\u70B9\u4E24\u70B9\uFF0C\u800C\u4E09\u70B9\u56DB\u70B9</span>
</code></pre>
</li>
<li>
<p>\u5F53\u7136react\u6CA1\u6709\u6307\u4EE4\u7684\u5173\u7CFB\uFF0C\u6240\u4EE5\u6CA1\u6709\u4EC0\u4E48\u50CF<code>v-for</code>\u7684<code>r-for</code>\u7684\u6307\u4EE4\u3002\u6240\u4EE5\u5BF9\u4E00\u4E2A\u6570\u7EC4\u7684\u6E32\u67D3\uFF0C\u6211\u4EEC\u9700\u8981\u7528js\u91CC\u9762\u7684\u5FAA\u73AF\uFF0C\u8FD9\u91CC\u57FA\u672C\u4E0A\u90FD\u662F\u91C7\u7528\u7684\u662F\u6570\u7EC4\u7684<code>map\u51FD\u6570</code>\u3002</p>
<p>\u4E00\u6CE2\u4E09\u6298\u8FC7\u540E\uFF0C\u7EC8\u4E8E\u5B8C\u6210\u4E86\u4E00\u4E2A\u7B80\u964B\u7684TODO\uFF0C\uFF0C\u597D\u7D2F\u597D\u7D2F\uFF0C\u611F\u89C9\u50CF\u662F\u5B8C\u5168\u518D\u5199\u539F\u751Fjs\u4F3C\u5F97\u3002\u53EF\u80FD\u6211\u662F\u88ABvue\u60EF\u574F\u7684\u5B69\u5B50\u3002</p>
</li>
</ol>
<h2>\u6700\u540E</h2>
<p>\u200B	\u5230\u4ECA\u5929\uFF0C\u5B66\u4E60<code>react</code>\u5DF2\u7ECF2\u4E2A\u661F\u671F\u4E86\uFF0C\u57FA\u672C\u4E0A\u4E60\u60EF\u4E86react\u7684\u7F16\u7801\u65B9\u5F0F\uFF0C\u6162\u6162\u7684\u4ECE\u5F00\u59CB\u7684\u5F88\u4E0D\u559C\u6B22\u7684\u53D8\u6210\u4E86\u559C\u6B22\uFF0C\u81F3\u4E8E\u4E3A\u4EC0\u4E48\uFF0C\u6211\u4E5F\u4E0D\u6E05\u695A\u3002\u53EF\u80FD\u662F\u6211\u66F4\u559C\u6B22\u8FD9\u79CD\u4E0D\u7528\u6307\u4EE4\u7684\u4E1C\u897F\uFF0C\u611F\u89C9\u6240\u4EE5\u7684\u4E1C\u897F\u90FD\u662F\u81EA\u5DF1\u5199\u7684\u3002\u76EE\u524D\u4E5F\u57FA\u672C\u4E0A\u5B8C\u6210\u4E86\u7528react\u5BF9\u6211\u7684\u535A\u5BA2\u8FDB\u884C\u7684\u91CD\u6784\uFF0C\u76EE\u524D\u6B63\u5728\u770B<code>redux</code>\u6765\u8FDB\u884C\u72B6\u6001\u7BA1\u7406\u3002\u4EE5\u53CA\u7528<code>axios</code>\u6765\u6253\u901A\u524D\u540E\u7AEF\u7684\u4EA4\u4E92\u3002</p>
<p>\u200B	\u8FD9\u91CC\u4E2A\u4EBA\u867D\u7136\u5B66\u4E862\u4E2A\u661F\u671F\uFF0C\u4F46\u662F\u603B\u7ED3\u4E00\u4E0B\uFF0C<code>vue</code>\u66F4\u9002\u5408\u4E8E\u5FEB\u901F\u642D\u5EFA\u524D\u7AEF\u754C\u9762\uFF0C\u7279\u522B\u65F6\u5019\u90A3\u4E9B\u540E\u53F0\u4EBA\u5458\u517C\u804C\u524D\u7AEF\uFF0C\u56E0\u4E3A\u5B66\u4E60\u6210\u672C\u5F88\u4F4E\uFF0C\u5BF9\u524D\u7AEF\u7684\u57FA\u7840\u77E5\u8BC6\u8981\u6C42\u4E0D\u9AD8\u3002<code>react</code>\u7684\u8BDD\u66F4\u9002\u5408\u6211\u4EEC\u8FD9\u7C7B\u4E00\u76F4\u5B66\u4E60\u524D\u7AEF\u7684\u4EBA\uFF0C\u56E0\u4E3A\u53EF\u4EE5\u5728\u5199react\u7684\u65F6\u5019\uFF0C\u4FDD\u5B58\u6211\u4EEC\u4EE5\u524D\u7684\u524D\u7AEF\u57FA\u7840\u77E5\u8BC6\u3002\u4E0D\u7BA1\u600E\u4E48\u8BF4\uFF0Cvue\u548Creact\u8FD9\u5BF9\u5144\u5F1F\uFF0C\u90FD\u5E94\u8BE5\u503C\u5F97\u6211\u4EEC\u53BB\u4E86\u89E3\uFF0C\u7136\u540E\u719F\u6089\u5176\u4E2D\u7684\u4E00\u95E8\u5427\u3002</p>
<p>\u200B	\u8FD9\u91CC\u4E2A\u4EBA\u89C9\u5F97\u5B66\u4E60react\u6700\u5927\u7684\u5FE0\u544A\uFF1A <code>\u9047\u5230\u95EE\u9898\u7B2C\u4E00\u65F6\u95F4\u7528\u8C37\u6B4C\u641C\u7D20\uFF0C\u6211\u4E5F\u4E0D\u77E5\u9053\u4E3A\u4EC0\u4E48\uFF0C\u767E\u5EA6\u641C\u7D20\u4E0D\u51FA\u6765\u7684\u4E1C\u897F\u8C37\u6B4C\u4E00\u4E0B\u5C31\u51FA\u6765\u4E86\u3002\u5C31\u548C\u5B66vue\u7684\u65F6\u5019\u4E00\u6837\u8C37\u6B4C\u641C\u7D20\u4E0D\u51FA\u6765\uFF0C\u4F46\u662F\u767E\u5EA6\u4E00\u4E0B\u5C31\u51FA\u6765\u3002\u8FD9\u53EF\u80FD\u662F\u548C\u4F7F\u7528\u7684\u4EBA\u6570\u6709\u5173\u628A\uFF01</code></p>
<p>\u200B	<strong>\u58F0\u660E\uFF1A \u672C\u7BC7\u535A\u6587\u6CA1\u6709\u4EFB\u4F55\u7684\u8D2C\u4F4E\u4E00\u4E2A\u63D0\u9AD8\u53E6\u4E00\u4E2A\u3002\u6B64\u6587\u4F5C\u4E3A\u6211\u5B66\u4E60\u8FC7\u7A0B\u7684\u8BB0\u5F55\uFF0C\u8BB0\u5F55\u4E3A\u4EC0\u4E48\u6211\u8981\u5B66\u4E86vue\u4EE5\u540E\u518D\u53BB\u5C1D\u8BD5\u5B66\u4E60react\u4E3A\u4EC0\u4E48\u4F1A\u6162\u6162\u7684\u559C\u6B22\u4E0A\u5B83\u3002\u4EE5\u53CA\u8BB0\u5F55\u4E00\u4E0B\u521D\u5B66\u8DEF\u4E0A\u7684\u4E00\u4E9B\u5C0F\u95EE\u9898\u3002\u53EF\u80FD\u5B58\u5728\u6709\u4E9B\u8BED\u53E5\u8A00\u8BBA\u8FC7\u6FC0\uFF0C\u8BF7\u8C05\u89E3\u3002\u6709\u4EC0\u4E48\u597D\u7684\u5EFA\u8BAE\uFF0C\u8BF7\u5728\u4E0B\u9762\u5199\u51FA\u6765\u54E6\uFF01\u8C22\u8C22\uFF01</strong></p>
`}})}});export{s as default};
