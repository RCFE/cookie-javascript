# Javascript Cookie

一个轻量级别的浏览器端cookie操作的库

* 没有任何依赖
* 支持自定义解码与转码
* 源码采用ES6语法书写
* 读取支持用JSON格式化


## 安装

### 直接下载

在[这里](https://github.com/Cookie/Cookie)下载，然后在html里面通过script标签引入

```html

<script src="path/to/Cookie"></script>

```

### AMD CommonJs ES6

首先安装Cookie这个包


```bash

npm install Cookie

```

然后在JavaScript文件里面引入

```javascript
# CommonJs

const Cookie = require('Cookie')

# ES6

import Cookie from 'Cookie'

```

## 使用

### 创建或者覆盖

通过`Cookie`的`set`方法来创建或者覆盖一个`cookie`

创建一个新的cookie

```javascript

Cookie.set('name', 'value')

```

你也可以设置一个对象或者数组当做值

```javascript

Cookie.set('object', {a: 1, b: 3})

```
创建一个新的cookie，并且设置他的过期时间（`expires`）或者 （`max-age`），其中`expires`有3种类型的值：1、`Number`，2、`String`，3、`Date`
其中`Number`类型的值分为两种情况:① `expires === Infinity`设置其永不过期；② `expires`等于一个整数，这个整数是以天为单位的
而`max-age`是以秒为单位的
创建一个永不过期的`cookie`

```javascript

Cookie.set('name', 'value', {expires: Infinity})

```

创建一个1天后过期的`cookie`

```javascript

Cookie.set('name', 'value', {expires: 1})

```

你还可以通过设置`max-age`来设置`cookie`过期时间
创建一个一天后过期的`cookie`

```javascript

Cookie.set('name', 'value', {maxAge: 24 * 60 * 60})

```

当然你也可以在创建`cookie`的时候设置其`path`，`domain`，`secure`
你只需要在创建的时候在第三个参数里面对应的字段以及值就可以了，其中`secure`的值是一个`boolean`

创建一个只能在`https`里面传输的，`path`为`/example`，`domain`为`example.com`（包括所有子域名）`subdomain.example.com`，7天后过期的`cookie`

```

Cookie.set('name', 'value', {
  expires: 7, // or maxAge: 7 * 24 * 60 * 60
  path: '/example',
  domain: 'example.com',
  secure: true
})

```

### 读取

通过`Cookie`的`get`方法来读取一个或者所有可读`cookie`

```javascript

Cookie.get('name') // => 'value'

```

你也可以传入第二个参数（`{json: true}`）来设置读取的值是否进行格式化，默认第二个参数为`false`，所以读取出来的都是字符串 

```javascript

Cookie.get('object') // => '{a: 1, b: 3}'
Cookie.get('object', {json: true}) // {a: 1, b: 3}

```

如果读取的时候一个参数也不传入或者传入的是`{json: false}` or `{json: true}` 则是读取所有可以读取（比如服务端设置了`httpOnly: true`的浏览器端就读取不到）的`cookie`组成的一个`object`

```javascript

Cookie.get() // => {name: 'value', object: '{a: 1, b: 3}'}
Cookie.get({json: true}) // => {name: 'value', object: {a: 1, b: 3}}

```


### 删除

通过`Cookie`的`remove`方法来删除一个或者所有可删除`cookie`

```javascript

Cookie.remove('name')

```

如果在设置`cookie`的时候设置了`path`删除的时候必须把`path`带上

```javascript

Cookie.set('test', 'test', {path: '/test'})
Cookie.remove('test') // 失败
Cookie.remove('test', {path: '/test'}) // 成功

```

如果删除的时候没有提供参数，则视为删除所有可以删除的`cookie`

```javascript

Cookie.remove()

```


### 对外接口

这个也暴露的一个接口（`withConverter`）来自定义自己的行为

这是一个例子在读取的时后拦截默认的读取操作

```javscript

document.cookie = 'escaped=%u5317';
document.cookie = 'default=%E5%8C%97';
let cookie = Cookie.withConverter(function (name, value) {
    if ( name === 'escaped' ) {
        return unescape(value)
    }
})
cookie.get('escaped') // 北
cookie.get('default') // 北
cookie.get() // { escaped: '北', default: '北' }

```

写入的时候也可以自定义

创建一个新的实例来覆盖默认的读取与写入操作

```javascript

Cookie.withConverter({
    read: function (name, value) {
        // 覆盖默认读取方法
    },
    write: function (name, value) {
        // 覆盖默认写入方法
    }
})

```

## 参考

感谢<a href="https://github.com/js-cookie/js-cookie">https://github.com/js-cookie/js-cookie</a>

## License

[MIT](http://opensource.org/licenses/MIT)