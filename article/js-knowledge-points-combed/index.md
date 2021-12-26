---
path: js-knowledge-points-combed
title: JS 知识点梳理
desc: 又到校招时间点，又要开始准备一波面试了。通过熟悉使用到手写简单代码，所以这里的代码会尽量精简，只会实现基础功能，不去讨论过多的容错以及其他的完善。如果要追求完美，请留言讨论。
createAt: 2019.08.20
tag: [JS, 面试准备]
classify: Code
---
## 00 防抖 & 节流

> 防抖和节流基本上算是面试常考题，同时也是日常开发中比较常用的2个。

### 概念

防抖：事件被触发后等待一段时间后触发回调函数，如果在该段时间内再次触发了此事件，则重新开始计时。大家可以比喻成升降电梯，每次电梯的关门时间是**最后一个人**进来**以后**，隔N秒然后进行关门操作。

节流：事件在规定的时间内只能执行一次。如果在一段时间内多次触发，则还是只执行一次。大家可以理解为，在等红绿灯，不管车流量多少，红绿灯的等待时间都是一定的。

### 一图胜千言

![防抖与节流一图胜千言.gif](https://i.loli.net/2019/08/16/CyQJKWqi7eOM6Gp.gif)

### 应用场景

#### 防抖

1. 当我们对input搜索框需要做关键词选择的时候，如百度搜索的输入关键字选择热搜语句，我们可以对输入input框绑定`onChang`事件，当停止输入一段时间（如200ms），向后端发送请求，将获取关键词数据渲染出来。
2. 做页面适配的时候，我们需要对`window.resize`事件进行监听。我们只需要最后窗口的宽高，那我们就可以使用防抖，当最后一次变化时进行页面适配。
3. 对图片进行懒加载的时候，如果我们已经滑到最底部的时候，如果不对上拉事件进行限制，那么用户用户快速上滑几次，则会多次想后端发送请求，同时前端每次响应请求的时候会频繁的修改DOM。
4. 更多的使用，这里不在赘述，欢迎大家补充......

#### 节流

1. 有时候我们可能为了性能需要把页面中的图片进行懒加载处理，那么我们就需要对浏览器的滚动条进行事件监听，判断我们的滚动条是否在我们设置的可视化范围之内，进而改变图片的真实`src`到达性能优化的目的。由于滚动条事件触发是比较快的，如果我们不做处理会处理很多次，反而大大的消耗了浏览器的性能。
2. 更多的使用，这里不在赘述，欢迎大家补充......

### 思路

根据上面的概念以及图片的展示，大家应该知道防抖与节流到底是什么意思，然后就可以愉快的编码了。

关于防抖，无非就是当最后一次鼠标不动且已经隔了我们的延迟时间的时候调用我们的回调函数，如果在延迟等待期间，鼠标移动了，那么就要重新计时。

关于节流，就是每段时间内回调函数只执行一次，我们可以设置一个全局标识保存上次执行的时间，如果这次执行时间与上次执行时间差没有到达我们的设置值那么就不执行这次回调，否则就执行。

由于篇幅原因，基于上图的代码，已发在[`GitHub`](https://github.com/LiChangyi/code-demonstration)和[`JSRun`](http://jsrun.pro/ZzbKp)。大家可以先根据自己的理解去尝试实现一下，由于是手写代码，我贴的代码也很简单，只实现了基本功能，大家可以尝试在此基础上进行扩展，比如添加cancel函数等。可以在编写的时候，参考很多库，比如`lodash`中是如何实现的。

## 01 call,apply,bind

### 概念

> 在还原一个功能函数的时候，我们首先应该了解到这个函数的用法，用处以及为什么要使用它。只有这样我们才能尽可能的还原它。

关于这三个函数，在我印象中的作用就是改变函数的`this指向`。关于什么是`this`以及`this指向`的判断对于初学者来说又是比较复杂的，由于篇幅原因，这里不过多引申，感兴趣的同学可以自信了解。

随着`箭头函数`的普及，这三个函数的使用频率已经变少很多的。

```javascript
<!-- 比如在React中 -->
click() {
	console.log(this);
	alert('click');
}
render() {
	return (
		<button onClick={this.click}>按钮</button>
	)
}
<!-- 这样写是不会报错的，但是我会log的this对象不是我们想要的Compoent, 所以我们必须要在 constructor 里面进行函数this的绑定 -->
<!-- 在 constructor 中添加 -->
this.click = this.clic.bind(this);
<!-- 但是这样写是很繁琐，特别当一个 Component 有很多事件需要处理的时候，我们是需要添加很多的 bind 函数，所以箭头函数的出现替我们很好的解决了这个问题 -->
<!-- 将 <button> 改写 -->
<button onClick={() => this.click()}>按钮</button>
<!-- 或者将  click() 函数写成 -->
click = () => {
    console.log(this);
	alert('click');
}
```

### 应用场景

根据前面的介绍，由于箭头函数的普及，我们已经很少使用这三个函数去改变`this`指向了，但是在有些情况下，或者说对JS一些函数的取巧方面可以使用。

```javascript
// 比如对一个数组 取最小的一个数
const arr = [1, 2, 3, 0];
// 我们可以用 Math.min 方法和数组的解构
console.log(Math.min(...arr));
// 采用 apply
console.log(Math.min.apply(null, arr));

// 已经最经常用的函数，对一个变量的类型判断
console.log(Object.prototype.toString.call(arr));
```

以上2个案列都说明，有一些方法是定义在某个对象上的，如果我们要使用这些方法，我们就不能通过上文提到的箭头函数去实现，只能通过改变`this`的指向来实现我们的目的。

### 思路

这里主要是理解，this的指向问题是，谁调用指向谁，所以思路就是，给我们需要绑定的对象添加这个函数，然后执行他。

#### call

```javascript
Function.prototype.myCall = function (context, ...args) {
    // 默认指向 window
    context = context || window;
    // 这里的 this 就是我们需要执行的函数
    // 这里使用 symbol 防止与原有属性冲突
    const fnName = Symbol('fn');
    context[fnName] = this;
    const result = context[fnName](...args);
    // 删除我们附加的 fn 保存原对象干净
    delete context[fnName];
    // 返回函数执行返回值
    return result;
}
```

#### apply

和call一样，只是apply接受的是2个参数

```javascript
Function.prototype.myApply = function (context, args) {
    context = context || window;
    const fnName = Symbol('fn');
    context[fnName] = this;
    const result = context[fnName](...args);
    delete context[fnName];
    return result;
}
```

#### bind

bind函数的话要负责一点，bind的函数不会立即执行，所以返回肯定是一个改变过this指向的函数，我们还需要在此函数上加入原有函数原型上的一些属性方法（继承原函数）

```javascript
Function.prototype.myBind = function(context, ...args) {
    context = context || window;
    // 如果这里不用箭头函数，就要将里面的 this 替换为外部 this
    const fnBind = (...bindArgs) => {
        bindArgs = args.concat(bindArgs);
        const fnName = Symbol('fn');
        context[fnName] = this;
        const result = context[fnName](...bindArgs);
        delete context[fnName];
        return result; 
    }
    // 维护原型关系
    // 这里 FInherit 是一个空函数，但是不能采用箭头函数声明，否则找不到 constructor
    const FInherit = function (){};
    FInherit.prototype = this.prototype;
    fnBind.prototype = new FInherit();
    return fnBind;
}
```

## 02 instanceOf 与 new

> 也许这2个没什么关联性，但是我就是想写在一起。

### instanceOf

关于`instanceOf`可能很多同学都很陌生，包括我也很陌生，因为平时使用的太少了。我们先了解`instanceOf`是做什么的。

在MDN中描述：instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的**任何**位置。

所以我们从这字面意思大概可以知道我们需要如何去编码了，在概念中最重要的一点就是**任何**这个关键词，所以我们大概知道，我们大概要用类似递归的方法一直在原型链上查找。

```javascript
const myInstanceof = (L, constructor) => {
    let RPrototype = constructor.prototype;
    while (true) {
        if (L === null || L === undefined ) {
            // 已经找到最顶层了，还是没有找到，说明不属于
            return false;
        }
        if (RPrototype === L) {
            // 用三等说明是同一个，说明已经找到了
            return true;
        }
        // 如果都不满足，那继续 L 的原型上找
        L = L.__proto__;
    }
}
```

### new

MDN中描述：**new 运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。**new** 关键字会进行如下的操作：

1. 创建一个空的简单JavaScript对象（即`{}`）；
2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
3. 将步骤1新创建的对象作为`this`的上下文 ；
4. 如果该函数没有返回对象，则返回`this`。

所以根据以上四步，我们就可以进行函数的封装了。

```javascript
const myNew = (CL, ...args) => {
    // 第一步 创建空对象
    let obj = {};
    // 第二步 链接此对象
    obj = Object.create(CL.prototype);
    // 第三步 修正 this, 及执行构造函数的构造器，把初始化属性
    let ret = CL.apply(obj, args);
    // 第四步 返回this
    return typeof ret === 'object' ? ret : obj ;
}
```

## 03 Promise

在了解promise，大概我们要先去shang了解以前JS关于异步的处理方式，比如：回调函数，事件的发布订阅实现，promise解决，以及ES2017中的async，await解决方案。只有这样一层层的了解以后，才会发现promise和async是真的强大。

关于这里的promise，我不过多的介绍他的使用方法，感兴趣的可以自行去了解他的使用方法，这里我根据promise的A+规范[promise A+规范介绍（中文）](http://www.ituring.com.cn/article/66566)，来模拟一个自己的MyPromise类。

在规范中有几个难点需要我们去重点注意：

1. 状态是不可逆的。意思是：初始情况下promise的状态是`pending`，我们只能从`pending`状态迁移到`fulfilled`或者`rejected`2个状态，不能逆转，同时这2个状态也不能相互转化。所以这里在代码中实现是，当我们调用resolve和reject个函数的时候，我们需要进行当前状态进行判断，如果当前状态是`pending`我们才能进行后面的操作。
2. 关于错误的处理，代码在运行的过程中肯定会出现运行出错的可能，或者人为的抛出错误，所以我们在执行代码的时候用`try catch`语句块进行错误的捕获，然后进行reject。
3. 关于使用过promise的同学都清楚，then或者catch里面的代码都是异步执行的不是同步，所以我们可以使用`setTimeout`来解决这个问题。
4. 最关键且困难的地方是`then`方法，promise是可以进行链式调用的，有过链式调用基础的同学都可以知道肯定是返回了当前的this指针，但是我们上面提到过，promise的状态是不可逆转的，所以我们可以知道我们返回的是一个新的promise对象。
5. 因为promise是一个异步处理的函数，但是链式调用then方法是马上执行的，然后就会发现当前的状态是`pending`，但是我们也没有resolve值，所以当我们判断当前状态是`pending`的时候我们需要把需要处理`onFulfilled`和`onRejected`2个函数保存起来，直到promise中异步处理完以后然后根据当前成功还是失败执行对应数组中的函数。这里的有点`发布订阅模式`思想。
6. 关于函数`resolvePromise`的处理，因为每个then方法会返回一个值，这个值是影响下一个then方法的关键，所以我们需要算是进行循环处理。

根据A+规范以及以上几点需要注意的地方，大概就可以完成一个具有一定功能的promise对象了。然后便可以在此对象上添加一些常用方法比如：all, race......

关于我写的代码同样放在了我的[GitHub](https://github.com/LiChangyi/code-demonstration)上中的MyPromise.js文件。

在我们完成以后，我们可以通过MDN中的一些列子进行代码测试，当然也可以通过`promises-aplus-tests `这个npm包进行正确性的测试。

