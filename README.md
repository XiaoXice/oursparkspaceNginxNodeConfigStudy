# 初探服务器搭建

# 基础知识

## 1.1 教程简介

### 1.1.1 教程学习目标

* 了解小程序配合后台NodeJS服务器开发的相关知识
* 掌握小程序配合后台NodeJS服务开发的基础使用流程
* 能够使用小程序开发实现一个树洞功能

本次实验将会带大家初探微信小程序和Nodejs编写。学完本教程，大家将对前后端开发有清晰的认识，能操作微信开发者界面和构建自己的后哦台服务器，利用表单功能，对云开发数据库进行数据存取查询等操作，并在小程序前端显示效果。

### 1.1.2 教程学习安排

- 第一章：基础知识讲解
- 第二章：云开发实战

在第一章，我们将进行后台服务器搭建的基础知识的介绍，包括NodeJS基础实验、Mongoose基础操作和Koa框架的使用。在第2章，我们将手把手带大家进行前后端开发实战，在编写好后端程序之后，分为基础和进阶两部分实验：基础部分完成在本地数据库中进行操作，并呈现在小程序前端；进阶部分完成后端应用在远程服务器的部署，既能将用户输入的数据写入远程的服务器中，也能从远程服务器中读取到该数据，并呈现在前端。

### 1.1.3 小节总结

学会前后端开发，就能够应对更加复杂的业务逻辑需求，是当前普遍使用的方式。

注意：文中的代码如果直接复制，有可能会因为隐藏格式而带来错误。有两种解决方法：

1. 把出错的代码删掉，手敲一遍。

2. 利用代码片段解决，具体方法看这里

# 实战开发

## 1.2 基础知识 -- 后端

### 1.2.1 为什么要学习后端

后端作为当下的互联网环境中扮演着不可或缺的地位，比如你现在正在浏览的“火花空间”中的文章，就是在你向后端发出请求之后，后端经过一定的处理返回给浏览器才能展示到你的面前。如果没有了后端，你就可以看到一个熟悉的404 Not Found错误。

当前一个常见的前后端分离的网站由以下三个部分组成：

- **前端** 用户操作的界面，常见的前端有：浏览器，微信小程序等等。他们包含了用户能够看到所有东西，表单、按钮、图片、文字以及动画。前端页面通常使用HTML、CSS、JS以及他们的变体进行编写。
- **后端** 用以处理无法在、或者不方便在前端进行的操作，通常是文件的存储，用户权限校验，信息和数据的存储等等。后端程序则以使用大部分流行的语言进行编写，基本没有什么限制，为了降低学习语言的数量，我们可以选择使用JS进行后台的编写。
- **数据库** 大量的数据要按照一定的结构存放在数据库中，方便后端在需要的时候进行调用。常见的数据库有：Mysql，MongoDB，SQL server。在本次教程中，我们采用和JS关系最为密切的MongoDB作为我们的数据库。

可见，我们所需要编写的后端是一个承上启下的存在，需要将前端请求的数据从数据库中查找出来，翻译成前端需要的格式并返回，或是将前端提交的数据按照编写程序时对于数据库的格式存储到数据库中。最简单的一个登录和注销的操作就需要用到后端查询用户输入的密码是否正确，因为我们不可能将所有用户的密码都明文存储在前端，这样太危险了。

### 1.2.2 留言板原形展示+功能描述

在本次实验的进阶部分，我们要发布一个完整可用的微信小程序。原型如下图，它包括几个功能：

- **登录** 调用微信提供的登录接口进行登录，并获得用户的头像和昵称，用作留言板的显示。
- **查看留言** 调用后端提供的接口，我们可以按照时间顺序，看到所有使用这个小程序的人发表的留言。
- **喜欢** 对于你觉得有兴趣的留言，你可以点击“喜欢”按钮，为你喜欢的留言点赞。
- **评论** 对你深受启发的留言，你可以在这条留言下面评论，或者查看别人的留言。
- **发表** 如果你也想上留言版，你也可以自己发布留言。

![1.2.2 原型图](img/1.2.2原型图.jpg)
<!-- TODO: 这里需要更换成最终的效果图 -->

### 1.2.3 小节总结+测试

本节介绍了表单的概念和用途，并描述了一个前后端开发的答题思路。在第2章开发实战的进阶部分，我们将实际上手，体验开发这个小程序。

完成本节学习的同学，请认真完成本节测试。完成答题后，可查看答案解析，仍有疑惑可点击右边👉悬浮框中的“提问”，及时询问教师和助教。

## 1.3 NodeJS 入门

### 1.3.1 NodeJS 基础

#### 什么是NodeJS

JS是脚本语言，脚本语言都需要一个解析器才能运行。对于写在微信小程序里的JS，微信充当了解析器的角色。而对于需要独立运行的JS，NodeJS就是一个解析器。

每一种解析器都是一个运行环境，不但允许JS定义各种数据结构，进行各种计算，还允许JS使用运行环境提供的内置对象和方法做一些事情。例如运行在浏览器中的JS的用途是操作DOM，浏览器就提供了document之类的内置对象； 运行为微信小程序中的JS用途是数据处理，微信小程序提供了数据绑定的对象和发送网络请求的方式。而运行在NodeJS中的JS的用途是操作磁盘文件或搭建HTTP服务器，NodeJS就相应提供了fs、http等内置对象。

#### 如何安装

##### *安装程序*

NodeJS提供了一些安装程序，都可以在[nodejs.org](https://nodejs.org/en/)这里下载并安装。

Windows系统下，选择和系统版本匹配的.msi后缀的安装文件。Mac OS X系统下，选择.pkg后缀的安装文件。

##### *编译安装*

Linux系统下没有现成的安装程序可用，虽然一些发行版可以使用`apt-get`之类的方式安装，但不一定能安装到最新版。因此Linux系统下一般使用以下方式编译方式安装NodeJS。

1. 确保系统下g++版本在4.6以上，python版本在2.6以上。

2. 从nodejs.org下载`tar.gz`后缀的NodeJS最新版源代码包并解压到某个位置。

3. 进入解压到的目录，使用以下命令编译和安装。

``` bash
$ ./configure
$ make
$ sudo make install
```

#### 如何运行

打开终端，键入`node`进入命令交互模式，可以输入一条代码语句后立即执行并显示结果，例如：

```
$ node
> console.log('Hello World!');
Hello World!
```

如果要运行一大段代码的话，可以先写一个JS文件再运行。例如有以下`hello.js`。

``` js
// hello.js
function hello() {
    console.log('Hello World!');
}
hello();
```

写好后在终端下键入`node hello.js`运行，结果如下：

``` bash
$ node hello.js
Hello World!
```
#### 模块

编写稍大一点的程序时一般都会将代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。

在编写每个模块时，都有`require`、`exports`、`module`三个预先定义好的变量可供使用。

##### require

`require`函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可使用相对路径（以`./`开头），或者是绝对路径（以`/`或`C:`之类的盘符开头）。另外，模块名中的`.js`扩展名可以省略。以下是一个例子。

例如我们置当前终端所在目录为`C:/User/user/learnNodeJS/`，并在这个目录下新建一个叫做`foo.js`的模块(如何编写一个模块请往下看)。

	var foo1 = require('./foo');
	var foo2 = require('./foo.js');
	var foo3 = require('C:/User/user/learnNodeJS/foo');
	var foo4 = require('C:/User/user/learnNodeJS/foo.js');
	
	// foo1至foo4中保存的是同一个模块的导出对象。

另外，可以使用以下方式加载和使用一个JSON文件。

	var data = require('./data.json');

##### exports

`exports`对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过`require`函数使用当前模块时得到的就是当前模块的`exports`对象。以下例子中导出了一个公有方法。

还是在刚才所说的文件夹，我们在`foo.js`中写入如下代码：

    // foo.js
	exports.hello = function () {
		console.log('Hello World!');
	};

这样子，如果我们就可以使用`require`引入这个模块，并使用模块中定义的函数了。

修改之前的`hello.js`文件为：

    // hello.js
    var hello = require('./foo');
    hello.hello();

写好后在终端下键入`node hello.js`运行，结果如下：

    $ node hello.js
    Hello World!

##### module

通过`module`对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用这种方式。

让我们来试一下，修改上次创建的`foo.js`文件为：

    // foo.js
	module.exports = function () {
		console.log('Hello World!');
	};

修改之前的`hello.js`文件为：

    // hello.js
    var hello = require('./foo');
    hello();

写好后在终端下键入`node hello.js`运行，结果如下：

    $ node hello.js
    Hello World!

以上代码中，`foo`模块默认导出对象被替换为一个函数。

##### 模块初始化

一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。

##### 主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，`main.js`就是主模块。

	$ node main.js

##### 完整示例

例如有以下目录。

	- C:/User/user/learnNodeJS/
		- util/
			counter.js
		main.js

其中`counter.js`内容如下：

	var i = 0;

	function count() {
		return ++i;
	}

	exports.count = count;

该模块内部定义了一个私有变量`i`，并在`exports`对象导出了一个公有方法`count`。

主模块`main.js`内容如下：

	var counter1 = require('./util/counter');
	var	counter2 = require('./util/counter');

	console.log(counter1.count());
	console.log(counter2.count());
	console.log(counter2.count());

运行该程序的结果如下：

	$ node main.js
	1
	2
	3

可以看到，`counter.js`并没有因为被require了两次而初始化两次。

#### 二进制模块

虽然一般我们使用JS编写模块，但NodeJS也支持使用C/C++编写二进制模块。编译好的二进制模块除了文件扩展名是`.node`外，和JS模块的使用方式相同。虽然二进制模块能使用操作系统提供的所有功能，拥有无限的潜能，但对于前端同学而言编写过于困难，并且难以跨平台使用，因此不在本教程的覆盖范围内。

#### 小结

本章介绍了有关NodeJS的基本概念和使用方法，总结起来有以下知识点：

+ NodeJS是一个JS脚本解析器，任何操作系统下安装NodeJS本质上做的事情都是把NodeJS执行程序复制到一个目录，然后保证这个目录在系统PATH环境变量下，以便终端下可以使用`node`命令。

+ 终端下直接输入`node`命令可进入命令交互模式，很适合用来测试一些JS代码片段，比如正则表达式。

+ NodeJS使用[CMD](http://wiki.commonjs.org/)模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次。

+ 除非JS模块不能满足需求，否则不要轻易使用二进制模块，否则你的用户会叫苦连天。


### 1.3.2 代码的组织和部署

有经验的C程序员在编写一个新程序时首先从make文件写起。同样的，使用NodeJS编写程序前，为了有个良好的开端，首先需要准备好代码的目录结构和部署方式，就如同修房子要先搭脚手架。本章将介绍与之相关的各种知识。

#### 模块路径解析规则

我们已经知道，`require`函数支持斜杠（`/`）或盘符（`C:`）开头的绝对路径，也支持`./`开头的相对路径。但这两种路径在模块之间建立了强耦合关系，一旦某个模块文件的存放位置需要变更，使用该模块的其它模块的代码也需要跟着调整，变得牵一发动全身。因此，`require`函数支持第三种形式的路径，写法类似于`foo/bar`，并依次按照以下规则解析路径，直到找到模块位置。

1. 内置模块

	如果传递给`require`函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如`require('fs')`。

2. node_modules目录

	NodeJS定义了一个特殊的`node_modules`目录用于存放模块。例如某个模块的绝对路径是`C:/User/user/learnNodeJS/hello.js`，在该模块中使用`require('foo/bar')`方式加载模块时，则NodeJS依次尝试使用以下路径。

		C:/User/user/learnNodeJS/node_modules/foo/bar
		C:/User/user/node_modules/foo/bar
		C:/User/node_modules/foo/bar
        C:/node_modules/foo/bar

3. NODE_PATH环境变量

	与PATH环境变量类似，NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间在Linux下使用`:`分隔，在Windows下使用`;`分隔。例如在Linux下定义了以下NODE_PATH环境变量：

		NODE_PATH=/home/user/lib:/home/lib

    在Windows下，并不存在默认值。

	当使用`require('foo/bar')`的方式加载模块时，则NodeJS依次尝试以下路径。

		/home/user/lib/foo/bar
		/home/lib/foo/bar

#### 包（package）

我们已经知道了JS模块的基本单位是单个JS文件，但复杂些的模块往往由多个子模块组成。为了便于管理和使用，我们可以把由多个子模块组成的大模块称做`包`，并把所有子模块放在同一个目录里。

在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象。例如有以下目录结构。

	- C:/User/user/learnNodeJS/
		- cat/
			head.js
			body.js
			main.js

其中`cat`目录定义了一个包，其中包含了3个子模块。`main.js`作为入口模块，其内容如下：

	var head = require('./head');
	var body = require('./body');

	exports.create = function (name) {
		return {
			name: name,
			head: head.create(),
			body: body.create()
		};
	};

在其它模块里使用包的时候，需要加载包的入口模块。接着上例，使用`require('C:/User/user/learnNodeJS/cat/main')`能达到目的，但是入口模块名称出现在路径里看上去不是个好主意。因此我们需要做点额外的工作，让包使用起来更像是单个模块。

##### index.js

当模块的文件名是`index.js`，加载模块时可以使用模块所在目录的路径代替模块文件路径，因此接着上例，以下两条语句等价。

	var cat = require('C:/User/user/learnNodeJS/cat');
	var cat = require('C:/User/user/learnNodeJS/cat/index');

这样处理后，就只需要把包目录路径传递给`require`函数，感觉上整个目录被当作单个模块使用，更有整体感。

##### package.json

如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个`package.json`文件，并在其中指定入口模块的路径。上例中的`cat`模块可以重构如下。

	- C:/User/user/learnNodeJS/
		- cat/
			+ doc/
			- lib/
				head.js
				body.js
				main.js
			+ tests/
			package.json

其中`package.json`内容如下。

	{
		"name": "cat",
		"main": "./lib/main.js"
	}

如此一来，就同样可以使用`require('C:/User/user/learnNodeJS/cat')`的方式加载模块。NodeJS会根据包目录下的`package.json`找到入口模块所在位置。

#### 命令行程序

使用NodeJS编写的东西，要么是一个包，要么是一个命令行程序，而前者最终也会用于开发后者。因此我们在部署代码时需要一些技巧，让用户觉得自己是在使用一个命令行程序。

例如我们用NodeJS写了个程序，可以把命令行参数原样打印出来。该程序很简单，在主模块内实现了所有功能。并且写好后，我们把该程序部署在`C:/User/user/learnNodeJS/bin/node-echo.js`这个位置。为了在任何目录下都能运行该程序，我们需要使用以下终端命令。

	$ node C:/User/user/learnNodeJS/bin/node-echo.js Hello World
	Hello World

这种使用方式看起来不怎么像是一个命令行程序，下边的才是我们期望的方式。

	$ node-echo Hello World

##### Linux

在Linux系统下，我们可以把JS文件当作shell脚本来运行，从而达到上述目的，具体步骤如下：

1. 在shell脚本中，可以通过`#!`注释来指定当前脚本使用的解析器。所以我们首先在`node-echo.js`文件顶部增加以下一行注释，表明当前脚本使用NodeJS解析。

		#! /usr/bin/env node

	NodeJS会忽略掉位于JS模块首行的`#!`注释，不必担心这行注释是非法语句。

2. 然后，我们使用以下命令赋予`node-echo.js`文件执行权限。

		$ chmod +x /home/user/bin/node-echo.js

3. 最后，我们在PATH环境变量中指定的某个目录下，例如在`/usr/local/bin`下边创建一个软链文件，文件名与我们希望使用的终端命令同名，命令如下：

		$ sudo ln -s /home/user/bin/node-echo.js /usr/local/bin/node-echo

这样处理后，我们就可以在任何目录下使用`node-echo`命令了。

##### Windows

在Windows系统下的做法完全不同，我们得靠`.cmd`文件来解决问题。假设`node-echo.js`存放在`C:\User\user\learnNodeJS\bin`目录，并且该目录已经添加到PATH环境变量里了。接下来需要在该目录下新建一个名为`node-echo.cmd`的文件，文件内容如下：

	@node "C:\User\user\learnNodeJS\bin\node-echo.js" %*

这样处理后，我们就可以在任何目录下使用`node-echo`命令了。

#### 工程目录

了解了以上知识后，现在我们可以来完整地规划一个工程目录了。以编写一个命令行程序为例，一般我们会同时提供命令行模式和API模式两种使用方式，并且我们会借助三方包来编写代码。除了代码外，一个完整的程序也应该有自己的文档和测试用例。因此，一个标准的工程目录都看起来像下边这样。

	- C:/User/user/workspace/node-echo/   # 工程目录
		- bin/                            # 存放命令行相关代码
			node-echo
		+ doc/                            # 存放文档
		- lib/                            # 存放API相关代码
			echo.js
		- node_modules/                   # 存放三方包
			+ argv/
		+ tests/                          # 存放测试用例
		package.json                      # 元数据文件
		README.md                         # 说明文件

其中部分文件内容如下：

	/* bin/node-echo */
	var argv = require('argv'),
		echo = require('../lib/echo');
	console.log(echo(argv.join(' ')));

	/* lib/echo.js */
	module.exports = function (message) {
		return message;
	};

	/* package.json */
	{
		"name": "node-echo",
		"main": "./lib/echo.js"
	}

以上例子中分类存放了不同类型的文件，并通过`node_moudles`目录直接使用三方包名加载模块。此外，定义了`package.json`之后，`node-echo`目录也可被当作一个包来使用。

#### NPM

NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：

+ 允许用户从NPM服务器下载别人编写的三方包到本地使用。

+ 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。

+ 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

可以看到，NPM建立了一个NodeJS生态圈，NodeJS开发者和用户可以在里边互通有无。以下分别介绍这三种场景下怎样使用NPM。

##### 下载三方包

需要使用三方包时，首先得知道有哪些包可用。虽然[npmjs.org](https://npmjs.org/)提供了个搜索框可以根据包名来搜索，但如果连想使用的三方包的名字都不确定的话，就请百度一下吧。知道了包名后，比如上边例子中的`argv`，就可以在工程目录下打开终端，使用以下命令来下载三方包。

	$ npm install argv
	...
	argv@0.0.2 node_modules\argv

下载好之后，`argv`包就放在了工程目录下的`node_modules`目录中，因此在代码中只需要通过`require('argv')`的方式就好，无需指定三方包路径。

以上命令默认下载最新版三方包，如果想要下载指定版本的话，可以在包名后边加上`@<version>`，例如通过以下命令可下载0.0.1版的`argv`。

	$ npm install argv@0.0.1
	...
	argv@0.0.1 node_modules\argv

如果使用到的三方包比较多，在终端下一个包一条命令地安装未免太人肉了。因此NPM对`package.json`的字段做了扩展，允许在其中申明三方包依赖。因此，上边例子中的`package.json`可以改写如下：

	{
		"name": "node-echo",
		"main": "./lib/echo.js",
		"dependencies": {
			"argv": "0.0.2"
		}
	}

这样处理后，在工程目录下就可以使用`npm install`命令批量安装三方包了。更重要的是，当以后`node-echo`也上传到了NPM服务器，别人下载这个包时，NPM会根据包中申明的三方包依赖自动下载进一步依赖的三方包。例如，使用`npm install node-echo`命令时，NPM会自动创建以下目录结构。

	- project/
		- node_modules/
			- node-echo/
				- node_modules/
					+ argv/
				...
		...

如此一来，用户只需关心自己直接使用的三方包，不需要自己去解决所有包的依赖关系。

##### 安装命令行程序

从NPM服务上下载安装一个命令行程序的方法与三方包类似。例如上例中的`node-echo`提供了命令行使用方式，只要`node-echo`自己配置好了相关的`package.json`字段，对于用户而言，只需要使用以下命令安装程序。

	$ npm install node-echo -g

参数中的`-g`表示全局安装，因此`node-echo`会默认安装到以下位置，并且NPM会自动创建好Linux系统下需要的软链文件或Windows系统下需要的`.cmd`文件。

	- /usr/local/               # Linux系统下
		- lib/node_modules/
			+ node-echo/
			...
		- bin/
			node-echo
			...
		...

	- %APPDATA%\npm\            # Windows系统下
		- node_modules\
			+ node-echo\
			...
		node-echo.cmd
		...

##### 发布代码

第一次使用NPM发布代码前需要注册一个账号。终端下运行`npm adduser`，之后按照提示做即可。账号搞定后，接着我们需要编辑`package.json`文件，加入NPM必需的字段。接着上边`node-echo`的例子，`package.json`里必要的字段如下。

	{
		"name": "node-echo",           # 包名，在NPM服务器上须要保持唯一
		"version": "1.0.0",            # 当前版本号
		"dependencies": {              # 三方包依赖，需要指定包名和版本号
			"argv": "0.0.2"
	  	},
		"main": "./lib/echo.js",       # 入口模块位置
		"bin" : {
			"node-echo": "./bin/node-echo"      # 命令行程序名和主模块位置
		}
	}

之后，我们就可以在`package.json`所在目录下运行`npm publish`发布代码了。

##### 版本号

使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码，这里简单介绍一下。

语义版本号分为`X.Y.Z`三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

	+ 如果只是修复bug，需要更新Z位。

	+ 如果是新增了功能，但是向下兼容，需要更新Y位。

	+ 如果有大变动，向下不兼容，需要更新X位。

版本号有了这个保证后，在申明三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如`"argv": "0.0.x"`表示依赖于`0.0.x`系列的最新版`argv`。NPM支持的所有版本号范围指定方式可以查看[官方文档](https://npmjs.org/doc/files/package.json.html#dependencies)。

##### 灵机一点

除了本章介绍的部分外，NPM还提供了很多功能，`package.json`里也有很多其它有用的字段。除了可以在[npmjs.org/doc/](https://npmjs.org/doc/)查看官方文档外，这里再介绍一些NPM常用命令。

+ NPM提供了很多命令，例如`install`和`publish`，使用`npm help`可查看所有命令。

+ 使用`npm help <command>`可查看某条命令的详细帮助，例如`npm help install`。

+ 在`package.json`所在目录下使用`npm install . -g`可先在本地安装当前命令行程序，可用于发布前的本地测试。

+ 使用`npm update <package>`可以把当前目录下`node_modules`子目录里边的对应模块更新至最新版本。

+ 使用`npm update <package> -g`可以把全局安装的对应命令行程序更新至最新版。

+ 使用`npm cache clear`可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。

+ 使用`npm unpublish <package>@<version>`可以撤销发布自己发布过的某个版本代码。

#### 小结

本章介绍了使用NodeJS编写代码前需要做的准备工作，总结起来有以下几点：

+ 编写代码前先规划好目录结构，才能做到有条不紊。

+ 稍大些的程序可以将代码拆分为多个模块管理，更大些的程序可以使用包来组织模块。

+ 合理使用`node_modules`和`NODE_PATH`来解耦包的使用方式和物理路径。

+ 使用NPM加入NodeJS生态圈互通有无。

+ 想到了心仪的包名时请提前在NPM上抢注。

### 1.3.3 文件操作

[7天学会Node - 文件管理](http://nqdeng.github.io/7-days-nodejs/#3)

### 1.3.4 网络操作

[7天学会Node - 网络操作](http://nqdeng.github.io/7-days-nodejs/#4)

### 1.3.5 进程管理

[7天学会Node - 进程管理](http://nqdeng.github.io/7-days-nodejs/#5)

### 1.3.6 异步编程

NodeJS最大的卖点——事件机制和异步IO，对开发者并不是透明的。开发者需要按异步方式编写代码才用得上这个卖点，而这一点也遭到了一些NodeJS反对者的抨击。但不管怎样，异步编程确实是NodeJS最大的特点，没有掌握异步编程就不能说是真正学会了NodeJS。本章将介绍与异步编程相关的各种知识。

#### 回调

在代码中，异步编程的直接体现就是回调。异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。我们首先可以看看以下代码。

	function heavyCompute(n, callback) {
		var count = 0,
			i, j;

		for (i = n; i > 0; --i) {
			for (j = n; j > 0; --j) {
				count += 1;
			}
		}

		callback(count);
	}

	heavyCompute(10000, function (count) {
		console.log(count);
	});

	console.log('hello');

	-- Console ------------------------------
	100000000
	hello

可以看到，以上代码中的回调函数仍然先于后续代码执行。JS本身是单线程运行的，不可能在一段代码还未结束运行时去运行别的代码，因此也就不存在异步执行的概念。

但是，如果某个函数做的事情是创建一个别的线程或进程，并与JS主线程并行地做一些事情，并在事情做完后通知JS主线程，那情况又不一样了。我们接着看看以下代码。

	setTimeout(function () {
		console.log('world');
	}, 1000);

	console.log('hello');

	-- Console ------------------------------
	hello
	world

这次可以看到，回调函数后于后续代码执行了。如同上边所说，JS本身是单线程的，无法异步执行，因此我们可以认为`setTimeout`这类JS规范之外的由运行环境提供的特殊函数做的事情是创建一个平行线程后立即返回，让JS主进程可以接着执行后续代码，并在收到平行进程的通知后再执行回调函数。除了`setTimeout`、`setInterval`这些常见的，这类函数还包括NodeJS提供的诸如`fs.readFile`之类的异步API。

另外，我们仍然回到JS是单线程运行的这个事实上，这决定了JS在执行完一段代码之前无法执行包括回调函数在内的别的代码。也就是说，即使平行线程完成工作了，通知JS主线程执行回调函数了，回调函数也要等到JS主线程空闲时才能开始执行。以下就是这么一个例子。

	function heavyCompute(n) {
		var count = 0,
			i, j;

		for (i = n; i > 0; --i) {
			for (j = n; j > 0; --j) {
				count += 1;
			}
		}
	}

	var t = new Date();

	setTimeout(function () {
		console.log(new Date() - t);
	}, 1000);

	heavyCompute(50000);

	-- Console ------------------------------
	8520

可以看到，本来应该在1秒后被调用的回调函数因为JS主线程忙于运行其它代码，实际执行时间被大幅延迟。

#### 代码设计模式

异步编程有很多特有的代码设计模式，为了实现同样的功能，使用同步方式和异步方式编写的代码会有很大差异。以下分别介绍一些常见的模式。

##### 函数返回值

使用一个函数的输出作为另一个函数的输入是很常见的需求，在同步方式下一般按以下方式编写代码：

	var output = fn1(fn2('input'));
	// Do something.

而在异步方式下，由于函数执行结果不是通过返回值，而是通过回调函数传递，因此一般按以下方式编写代码：

	fn2('input', function (output2) {
		fn1(output2, function (output1) {
			// Do something.
		});
	});

可以看到，这种方式就是一个回调函数套一个回调函多，套得太多了很容易写出`>`形状的代码。

##### 遍历数组

在遍历数组时，使用某个函数依次对数据成员做一些处理也是常见的需求。如果函数是同步执行的，一般就会写出以下代码：

	var len = arr.length,
		i = 0;

	for (; i < len; ++i) {
		arr[i] = sync(arr[i]);
	}

	// All array items have processed.

如果函数是异步执行的，以上代码就无法保证循环结束后所有数组成员都处理完毕了。如果数组成员必须一个接一个串行处理，则一般按照以下方式编写异步代码：

	(function next(i, len, callback) {
		if (i < len) {
			async(arr[i], function (value) {
				arr[i] = value;
				next(i + 1, len, callback);
			});
		} else {
			callback();
		}
	}(0, arr.length, function () {
		// All array items have processed.
	}));

可以看到，以上代码在异步函数执行一次并返回执行结果后才传入下一个数组成员并开始下一轮执行，直到所有数组成员处理完毕后，通过回调的方式触发后续代码的执行。

如果数组成员可以并行处理，但后续代码仍然需要所有数组成员处理完毕后才能执行的话，则异步代码会调整成以下形式：

	(function (i, len, count, callback) {
		for (; i < len; ++i) {
			(function (i) {
				async(arr[i], function (value) {
					arr[i] = value;
					if (++count === len) {
						callback();
					}
				});
			}(i));
		}
	}(0, arr.length, 0, function () {
		// All array items have processed.
	}));

可以看到，与异步串行遍历的版本相比，以上代码并行处理所有数组成员，并通过计数器变量来判断什么时候所有数组成员都处理完毕了。

##### 异常处理

JS自身提供的异常捕获和处理机制——`try..catch..`，只能用于同步执行的代码。以下是一个例子。

	function sync(fn) {
		return fn();
	}

	try {
		sync(null);
		// Do something.
	} catch (err) {
		console.log('Error: %s', err.message);
	}

	-- Console ------------------------------
	Error: object is not a function

可以看到，异常会沿着代码执行路径一直冒泡，直到遇到第一个`try`语句时被捕获住。但由于异步函数会打断代码执行路径，异步函数执行过程中以及执行之后产生的异常冒泡到执行路径被打断的位置时，如果一直没有遇到`try`语句，就作为一个全局异常抛出。以下是一个例子。

	function async(fn, callback) {
		// Code execution path breaks here.
		setTimeout(function ()　{
			callback(fn());
		}, 0);
	}

	try {
		async(null, function (data) {
			// Do something.
		});
	} catch (err) {
		console.log('Error: %s', err.message);
	}

	-- Console ------------------------------
	/home/user/test.js:4
			callback(fn());
	                 ^
	TypeError: object is not a function
	    at null._onTimeout (/home/user/test.js:4:13)
	    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)

因为代码执行路径被打断了，我们就需要在异常冒泡到断点之前用`try`语句把异常捕获住，并通过回调函数传递被捕获的异常。于是我们可以像下边这样改造上边的例子。

	function async(fn, callback) {
		// Code execution path breaks here.
		setTimeout(function ()　{
			try {
				callback(null, fn());
			} catch (err) {
				callback(err);
			}
		}, 0);
	}

	async(null, function (err, data) {
		if (err) {
			console.log('Error: %s', err.message);
		} else {
			// Do something.
		}
	});

	-- Console ------------------------------
	Error: object is not a function

可以看到，异常再次被捕获住了。在NodeJS中，几乎所有异步API都按照以上方式设计，回调函数中第一个参数都是`err`。因此我们在编写自己的异步函数时，也可以按照这种方式来处理异常，与NodeJS的设计风格保持一致。

有了异常处理方式后，我们接着可以想一想一般我们是怎么写代码的。基本上，我们的代码都是做一些事情，然后调用一个函数，然后再做一些事情，然后再调用一个函数，如此循环。如果我们写的是同步代码，只需要在代码入口点写一个`try`语句就能捕获所有冒泡上来的异常，示例如下。

	function main() {
		// Do something.
		syncA();
		// Do something.
		syncB();
		// Do something.
		syncC();
	}

	try {
		main();
	} catch (err) {
		// Deal with exception.
	}

但是，如果我们写的是异步代码，就只有呵呵了。由于每次异步函数调用都会打断代码执行路径，只能通过回调函数来传递异常，于是我们就需要在每个回调函数里判断是否有异常发生，于是只用三次异步函数调用，就会产生下边这种代码。

	function main(callback) {
		// Do something.
		asyncA(function (err, data) {
			if (err) {
				callback(err);
			} else {
				// Do something
				asyncB(function (err, data) {
					if (err) {
						callback(err);
					} else {
						// Do something
						asyncC(function (err, data) {
							if (err) {
								callback(err);
							} else {
								// Do something
								callback(null);
							}
						});
					}
				});
			}
		});
	}

	main(function (err) {
		if (err) {
			// Deal with exception.
		}
	});

可以看到，回调函数已经让代码变得复杂了，而异步方式下对异常的处理更加剧了代码的复杂度。如果NodeJS的最大卖点最后变成这个样子，那就没人愿意用NodeJS了，因此接下来会介绍NodeJS提供的一些解决方案。

#### 域（Domain）

>	**官方文档： ** [http://nodejs.org/api/domain.html](http://nodejs.org/api/domain.html)

NodeJS提供了`domain`模块，可以简化异步代码的异常处理。在介绍该模块之前，我们需要首先理解“域”的概念。简单的讲，一个域就是一个JS运行环境，在一个运行环境中，如果一个异常没有被捕获，将作为一个全局异常被抛出。NodeJS通过`process`对象提供了捕获全局异常的方法，示例代码如下

	process.on('uncaughtException', function (err) {
		console.log('Error: %s', err.message);
	});

	setTimeout(function (fn) {
		fn();
	});

	-- Console ------------------------------
	Error: undefined is not a function

虽然全局异常有个地方可以捕获了，但是对于大多数异常，我们希望尽早捕获，并根据结果决定代码的执行路径。我们用以下HTTP服务器代码作为例子：

	function async(request, callback) {
		// Do something.
		asyncA(request, function (err, data) {
			if (err) {
				callback(err);
			} else {
				// Do something
				asyncB(request, function (err, data) {
					if (err) {
						callback(err);
					} else {
						// Do something
						asyncC(request, function (err, data) {
							if (err) {
								callback(err);
							} else {
								// Do something
								callback(null, data);
							}
						});
					}
				});
			}
		});
	}

	http.createServer(function (request, response) {
		async(request, function (err, data) {
			if (err) {
				response.writeHead(500);
				response.end();
			} else {
				response.writeHead(200);
				response.end(data);
			}
		});
	});

以上代码将请求对象交给异步函数处理后，再根据处理结果返回响应。这里采用了使用回调函数传递异常的方案，因此`async`函数内部如果再多几个异步函数调用的话，代码就变成上边这副鬼样子了。为了让代码好看点，我们可以在每处理一个请求时，使用`domain`模块创建一个子域（JS子运行环境）。在子域内运行的代码可以随意抛出异常，而这些异常可以通过子域对象的`error`事件统一捕获。于是以上代码可以做如下改造：

	function async(request, callback) {
		// Do something.
		asyncA(request, function (data) {
			// Do something
			asyncB(request, function (data) {
				// Do something
				asyncC(request, function (data) {
					// Do something
					callback(data);
				});
			});
		});
	}

	http.createServer(function (request, response) {
		var d = domain.create();

		d.on('error', function () {
			response.writeHead(500);
			response.end();
		});

		d.run(function () {
			async(request, function (data) {
				response.writeHead(200);
				response.end(data);
			});
		});
	});

可以看到，我们使用`.create`方法创建了一个子域对象，并通过`.run`方法进入需要在子域中运行的代码的入口点。而位于子域中的异步函数回调函数由于不再需要捕获异常，代码一下子瘦身很多。

##### 陷阱

无论是通过`process`对象的`uncaughtException`事件捕获到全局异常，还是通过子域对象的`error`事件捕获到了子域异常，在NodeJS官方文档里都强烈建议处理完异常后立即重启程序，而不是让程序继续运行。按照官方文档的说法，发生异常后的程序处于一个不确定的运行状态，如果不立即退出的话，程序可能会发生严重内存泄漏，也可能表现得很奇怪。

但这里需要澄清一些事实。JS本身的`throw..try..catch`异常处理机制并不会导致内存泄漏，也不会让程序的执行结果出乎意料，但NodeJS并不是存粹的JS。NodeJS里大量的API内部是用C/C++实现的，因此NodeJS程序的运行过程中，代码执行路径穿梭于JS引擎内部和外部，而JS的异常抛出机制可能会打断正常的代码执行流程，导致C/C++部分的代码表现异常，进而导致内存泄漏等问题。

因此，使用`uncaughtException`或`domain`捕获异常，代码执行路径里涉及到了C/C++部分的代码时，如果不能确定是否会导致内存泄漏等问题，最好在处理完异常后重启程序比较妥当。而使用`try`语句捕获异常时一般捕获到的都是JS本身的异常，不用担心上诉问题。

#### 小结

本章介绍了JS异步编程相关的知识，总结起来有以下几点：

+ 不掌握异步编程就不算学会NodeJS。

+ 异步编程依托于回调来实现，而使用回调不一定就是异步编程。

+ 异步编程下的函数间数据传递、数组遍历和异常处理与同步编程有很大差别。

+ 使用`domain`模块简化异步代码的异常处理，并小心陷阱。


## 1.4 Mongodb 入门

### 1.4.1 MongoDB 基础

#### 什么是MongoDB

MongoDB是一个跨平台，面向文档的数据库，提供高性能，高可用性和易于扩展。MongoDB是工作在集合和文档上一种概念。

- 数据库
    数据库是一个集合的物理容器。每个数据库获取其自己设定在文件系统上的文件。一个单一的MongoDB服务器通常有多个数据库。
- 集合
    结合是一组MongoDB文件，存在于MongoDB数据库中。集合中的文档可以有不同的字段，通常情况下，一个集合中的所有文档都是类似的或者相关的。
- 文档
    文档是一组键值对。文档具有“动态模式”。所谓动态模式，在同一个集合的文档不必具有统一的结构，不同文档同一个键名的键值可以使用不同的数据类型。

实例文档：

下面就展示了一个留言的文档，仅仅是一个逗号分隔的键值对的文档结构，非常类似于JS的对象，二至之间的区别在于前者不能使用函数作为其成员。

    {
        _id: ObjectId(7df78ad8902c)
        title: 'MongoDB Overview', 
        description: 'MongoDB is no sql database',
        by: 'yiibai tutorial',
        url: 'http://www.yiibai.com',
        tags: ['mongodb', 'database', 'NoSQL'],
        likes: 100, 
        comments: [	
            {
                user:'user1',
                message: 'My first comment',
                dateCreated: new Date(2011,1,20,2,15),
                like: 0 
            },
            {
                user:'user2',
                message: 'My second comments',
                dateCreated: new Date(2011,1,25,7,45),
                like: 5
            }
        ]
    }

<!-- TODO: 这里的文档结构需要替换 -->


#### 如何安装

<!-- TODO: 这里应该有一个安装MongoDB的链接 -->

<!-- ##### 在 Windows 上安装 MongoBD

我们要在Windows上安装MongoDB，首先从 [https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community) 下载最新版本的MongoDB，下载完成后的文件应该是`mongodb-win32-x86_64-2008plus-ssl-[version]-signed.msi`，这里的[version]是你下载的MongoDB的版本。

双击运行之后下一步，同意使用协议后下一步。

![1.4.1 MongoDB安装](img\1.4.1MongoDB安装.png.jpg)

我们推荐使用完整模式(Complete)进行安装，因为这样可以免去一些配置的过程，当然你也可以选择自定义(Custom)模式进行安装，那么你就需要在今后的实验中注意自己数据库启动与否的问题。

###### 完整模式

![1.4.1MongoDB安装-完整模式](img\1.4.1MongoDB安装-完整模式.jpg)

保持这个默认的设置不要动，直接下一步即可完成安装。

打开`cmd`，七日换到

我们推荐将MongoDB安装在 -->

### 1.4.2 进行简单的增删改查

你刚刚安装完成的MongoDB其中包括两个常用的软件。如果你使用默认目录安装，可以打开`C:\Program Files\MongoDB\Server\[Version]\bin`进行查看，其中的[Version]代表的是你的大版本号，4.0.x都统一记作4.0，同理3.0.x统一记作3.0。

    C:\Program Files\MongoDB\Server\[Version]
        - \bin
          - mongo.exe    # MongoDB的命令行工具，可以用来连接和管理MongoDB服务器(不仅限于本地)。
          - mongod.exe   # MongoDB服务器主程序，用来响应所有客户端的连接和请求，并对数据库文件进行操作。
          ...
        ...

使用在`/bin`目录下使用控制台，键入`mongo`，他就会尝试连接本地的27017(MongoDB服务的默认端口号)，如果你的服务器正常启动，那么就可以看到如下的情况：

![1.4.1 Mongo连接成功](img\1.4.1Mongo连接成功.jpg)

接下来我们就可以进行各种操作了。

**提示：** 启动Mongo之后，你实际上到了Mongo自带的JS解释器环境，在这里你可以使用各种JS语言的特性。并且支持命令的Tab补全，命令只要输入一部分，点击Tab键就可以补全，如果没有效果就点两下，会列出所有可能的组合。

#### 显示所有的数据库

    没有任何内容的数据库不会显示，下面的数据库都是MongoDB的自身配置，建议不要随意更改。

        > show dbs
        admin   0.000GB
        config  0.000GB
        local   0.000GB

#### 显示当前数据库
  
        > db
        test

#### 切换/新建数据库
  
    如果数据库不存在则新建

        > use test                   # 切换数据库
        switched to db test
        > use learnMongodb           # 新建一个叫做`learnMongodb`的数据库
        switched to db learnMongodb
        > db
        learnMongodb

#### 创建集合
  
        > db.createCollection("HelloWorld")
        { "ok" : 1 }

#### 查询所有的集合
  
        > show collections
        HelloWorld

#### 在集合中插入一个文档

        > db.HelloWorld.insert({Hello: "world!"})
        WriteResult({ "nInserted" : 1 })

    当然你也可以在不创建集合的情况下直接创建文档，这会根据你的方式自动生成你要的文档。

        > db.areYouOK.insert({ILove: "BUPT", and: "SICE"})
        WriteResult({ "nInserted" : 1 })

#### 查询当前集合下所有文档
        
        > db.HelloWorld.find()
        { "_id" : ObjectId("5c88e87ef1deddeb125f7a16"), "Hello" : "world!" }
        > db.areYouOK.find()
        { "_id" : ObjectId("5c88e966f1deddeb125f7a17"), "ILove" : "BUPT", "and" : "SICE" }

#### 此时请各位随意插入一些数据进行练习。比如我们建立一个简单的通讯录(mailList)
    
    | name | gender | age |    email    |
    |:----:|:------:|:---:|:-----------:|
    | Bob  |  Male  | 18  |bob@sinla.com|
    | Lili | Female | 20  |lili@jojo.org|
    | Tom  |  Male  | 16  |tom@sinla.com|
    |Jerry |  Male  | 15  |jerr@bupt.com|
    |Jenny | Female | 16  |jenn@bupt.com|

    当然你可以选择一条一条插入如下：

        > db.mailList.insert({name:"Bob", gender:"Male", age: 18 ,email:"bob@sinla.com" })
        > db.mailList.insert({name:"Lili", gender:"Female", age: 20 ,email:"lili@jojo.org" })
        > db.mailList.insert({name:"Tom", gender:"Male", age: 16 ,email:"tom@sinla.com" })
        > db.mailList.insert({name:"Jerry", gender:"Male", age: 15 ,email:"jerr@bupt.com" })
        > db.mailList.insert({name:"Jenny", gender:"Female", age: 16 ,email:"jenn@bupt.com" })

    当然你也可以选择构建一个数组一下子全插入

        > db.mailList.insert([{name:"Bob", gender:"Male", age: 18 ,email:"bob@sinla.com" },
        ...{name:"Lili", gender:"Female", age: 20 ,email:"lili@jojo.org" },
        ...{name:"Tom", gender:"Male", age: 16 ,email:"tom@sinla.com" },
        ...{name:"Jerry", gender:"Male", age: 15 ,email:"jerr@bupt.com" },
        ...{name:"Jenny", gender:"Female", age: 16 ,email:"jenn@bupt.com" }])
        BulkWriteResult({
                "writeErrors" : [ ],
                "writeConcernErrors" : [ ],
                "nInserted" : 5,
                "nUpserted" : 0,
                "nMatched" : 0,
                "nModified" : 0,
                "nRemoved" : 0,
                "upserted" : [ ]
        })

    还有更简单的方法，运用你的JS知识就可以了，在此不一一列举，请各位自行探索。

    之后我们再次查询全部就可以看到所有我们插入的数据了。

        > db.mailList.find()
        { "_id" : ObjectId("5c88edbef1deddeb125f7a1f"), "name" : "Bob", "gender" : "Male", "age" : 18, "email" : "bob@sinla.com" }
        .... 这里省略几个人 -- 作者注
        { "_id" : ObjectId("5c88edbef1deddeb125f7a23"), "name" : "Jenny", "gender" : "Female", "age" : 16, "email" : "jenn@bupt.com" }

#### 查询 -- 格式化输出
    
        > db.mailList.find().pretty()
        {
                "_id" : ObjectId("5c88edbef1deddeb125f7a1f"),
                "name" : "Bob",
                "gender" : "Male",
                "age" : 18,
                "email" : "bob@sinla.com"
        }
        .... 这里省略几个人 -- 作者注
        {
                "_id" : ObjectId("5c88edbef1deddeb125f7a23"),
                "name" : "Jenny",
                "gender" : "Female",
                "age" : 16,
                "email" : "jenn@bupt.com"
        }

    是不是就好看多了

#### 查询 -- 指定条件进行查询

        db.collection.find(query, projection)

    - query ：可选，使用查询操作符指定查询条件
    - projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

    | 通常的操作 | 语法 | 实例 |
    | :-: | :-: | - |
    | Equality<br>相等 | `{<key>:<value>}` 或 <br>`{<key>:{$eq:<value>}}` | `> db.mailList.find({name: "Bob"}).pretty()`<br>`{`<br>`"_id" : ObjectId("5c88edbef1deddeb125f7a1f")`<br>`"name" : "Bob",`<br>`"gender" : "Male",`<br>`"age" : 18,`<br>`"email" : "bob@sinla.com"`<br>`}`|
    |Less Than<br>小于 | `{<key>:{$lt:<value>}}` | `> db.mailList.find({age:{$lt:16}}).pretty()`<br>`{`<br>`"_id" : ObjectId("5c88edbef1deddeb125f7a22")`<br>`"name" : "Jerry",`<br>`"gender" : "Male",`<br>`"age" : 15,`<br>`"email" : "jerr@bupt.com"`<br>`}`<br> |
    |Less Than Equals<br>小于等于|`{<key>:{$lte:<value>}}`| `> db.mailList.find({age:{$lte:15}}).pretty()`<br>结果同上|
    |Greater Than<br>大于| `{<key>:{$gt:<value>}}`|`> db.mailList.find({age:{$gt:20}}).pretty()`<br>没有返回值，因为没有符合条件的|
    |Greater Than Equals<br>大于等于|`{<key>:{$gte:<value>}}`|`db.mailList.find({age:{$gte:20}}).pretty()`<br>请自行尝试，下同|
    |Not Equals<br>不等于| `{<key>:{$ne:<value>}}`|`db.mailList.find({age:{$ne:18}}).pretty()`|

    更多查询方式请见 [Query and Projection Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/query/)


    打印一个人名单

        > db.mailList.find({},{name: 1, _id: 0}))
            { "name" : "Bob" }
            { "name" : "Lili" }
            { "name" : "Tom" }
            { "name" : "Jerry" }
            { "name" : "Jenny" }

#### 更新

    假如Bob改名字了，现在他叫William

        > db.mailList.update({name: "Bob"},{$set:{name: "William"}})
        WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
        > db.mailList.find({name: "William"}).pretty()
        {
                "_id" : ObjectId("5c88edbef1deddeb125f7a1f"),
                "name" : "William",
                "gender" : "Male",
                "age" : 18,
                "email" : "bob@sinla.com"
        }
    
    新年过了，所有人的年龄都大了一岁

        > db.mailList.update({},{$inc:{age: 1}},false,true)
        WriteResult({ "nMatched" : 5, "nUpserted" : 0, "nModified" : 5 })
        > db.mailList.find()
        { "_id" : ObjectId("5c88edbef1deddeb125f7a1f"), "name" : "William", "gender" : "Male", "age" : 19, "email" : "bob@sinla.com" }
        { "_id" : ObjectId("5c88edbef1deddeb125f7a20"), "name" : "Lili", "gender" : "Female", "age" : 21, "email" : "lili@jojo.org" }
        { "_id" : ObjectId("5c88edbef1deddeb125f7a21"), "name" : "Tom", "gender" : "Male", "age" : 17, "email" : "tom@sinla.com" }
        { "_id" : ObjectId("5c88edbef1deddeb125f7a22"), "name" : "Jerry", "gender" : "Male", "age" : 16, "email" : "jerr@bupt.com" }
        { "_id" : ObjectId("5c88edbef1deddeb125f7a23"), "name" : "Jenny", "gender" : "Female", "age" : 17, "email" : "jenn@bupt.com" }

    可以看到所有人的岁数都加一了。

        db.collection.update(
            <query>,
            <update>,
            {
                upsert: <boolean>,
                multi: <boolean>,
                writeConcern: <document>
            }
        )

    - query : update的查询条件，类似sql update查询内where后面的。
    - update : update的对象和一些更新的操作符（如$,$inc[...](https://docs.mongodb.com/manual/reference/operator/update/)）等，也可以理解为sql update查询内set后面的
    - upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
    - multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
    - writeConcern :可选，抛出异常的级别。

    由此可知，所有人的年龄都+1的方式也可以写成`db.mailList.update({},{$inc:{age: 1}},{multi:true})`

#### 删除

        db.collection.remove(
            <query>,
            {
                justOne: <boolean>,
                writeConcern: <document>
            }
        )

    - query :（可选）删除的文档的条件。
    - justOne : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
    - writeConcern :（可选）抛出异常的级别。

    William由于某种原因，不能再取得联系了。

        > db.mailList.remove({name: "William"})
        WriteResult({ "nRemoved" : 1 })
        > db.mailList.find().length()
        4
    
    所有人都联系不上了。。。

        > db.mailList.remove()
        2019-03-13T20:24:00.307+0800 E QUERY    [js] Error: remove needs a query :
        DBCollection.prototype._parseRemove@src/mongo/shell/collection.js:362:1
        DBCollection.prototype.remove@src/mongo/shell/collection.js:389:18
        @(shell):1:1
        > db.mailList.remove({})
        WriteResult({ "nRemoved" : 4 })

#### 排序

    先回到上面添加的步骤，把人都加回来。

        > db.mailList.find({},{name: 1,age: 1 , _id: 0}).sort({age: 1})
        { "name" : "Jerry", "age" : 15 }
        { "name" : "Tom", "age" : 16 }
        { "name" : "Jenny", "age" : 16 }
        { "name" : "Bob", "age" : 18 }
        { "name" : "Lili", "age" : 20 }

    现在就是按照年龄升序排列了。

### 1.4.3 索引

索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构。

#### 为name字段创建索引

        > db.mailList.createIndex({name: 1})
        {
                "createdCollectionAutomatically" : false,
                "numIndexesBefore" : 1,
                "numIndexesAfter" : 2,
                "ok" : 1
        }

#### 查看集合索引

        > db.mailList.getIndexes()
        [
                {
                        "v" : 2,
                        "key" : {
                                "_id" : 1
                        },
                        "name" : "_id_",
                        "ns" : "learnMongodb.mailList"
                },
                {
                        "v" : 2,
                        "key" : {
                                "name" : 1
                        },
                        "name" : "name_1",
                        "ns" : "learnMongodb.mailList"
                }
        ]

#### 查看集合索引大小

        > db.mailList.totalIndexSize()
        40960

#### 删除集合所有索引

        > db.mailList.dropIndexes()
        {
                "nIndexesWas" : 2,
                "msg" : "non-_id indexes dropped for collection",
                "ok" : 1
        }
        > db.mailList.getIndexes()
        [
                {
                        "v" : 2,
                        "key" : {
                                "_id" : 1
                        },
                        "name" : "_id_",
                        "ns" : "learnMongodb.mailList"
                }
        ]

#### 删除集合指定索引

        db.col.dropIndex("索引名称")

    索引名可以通过上面的查看指令查询得到。

