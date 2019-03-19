(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{210:function(t,e,s){"use strict";s.r(e);var r=s(0),n=Object(r.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("p",[t._v("现在应该就完成了自己的代码，但是我们会发现，有一些文本需要根据程序所在环境进行配置，或者是开发人员并不像泄露，但是后端运行却需要的东西，例如：端口号，监听的地址，APPID和key等。")]),t._v(" "),s("p",[t._v("对于这种文本，我们就需要单独放在一个文件中，也就是所谓的配置文件。")]),t._v(" "),t._m(2),t._v(" "),s("p",[t._v("并在需要的位置引入这个文件作为一个模块，就可以取得对应的配置项了。")]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),s("p",[t._v("这样子我们的代码就可以放心的使用git来进行管理了。")]),t._v(" "),s("p",[t._v("根据之前的空白页的GitHub介绍，添加远程源什么的，在此不过多赘述。")]),t._v(" "),t._m(5),t._v(" "),s("p",[s("a",{attrs:{href:"https://www.cnblogs.com/klsw/p/7765427.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("vscode 调试node.js"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("PS: 这个博客是调试express 实际上差不多。")]),t._v(" "),s("p",[t._v("PPS: 上面这个教程是直接在必应上搜索“vscode 调试Nodejs”的第一条结果，如果觉得不是很懂请自行搜索。")])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"开发调试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开发调试","aria-hidden":"true"}},[this._v("#")]),this._v(" 开发调试")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"配置项独立"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置项独立","aria-hidden":"true"}},[this._v("#")]),this._v(" 配置项独立")])},function(){var t=this.$createElement,e=this._self._c||t;return e("pre",[e("code",[this._v('// config.js\nmodule.exports = {\n    mongoDBUrl: \'mongodb://mongo/massage\',\n    port: 3000,\n    host: "127.0.0.1",\n    WX_APPID: "wxb23XXXXXXXXX26b93",\n    WX_secretKey: "7a7d17d1XXXXXXXXXXXXXb421ed361"\n}\n')])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("当然这个文件由于包含机密，所以不能公开，因此需要添加到.gitignore中。但是别人使用的时候可能并不知道你的配置文件的格式，所以需要保留一个脱敏之后的版本随git更新"),e("code",[this._v("config.defent.js")]),this._v("。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"git管理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git管理","aria-hidden":"true"}},[this._v("#")]),this._v(" git管理")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"使用vscode调试代码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用vscode调试代码","aria-hidden":"true"}},[this._v("#")]),this._v(" 使用VSCode调试代码")])}],!1,null,null,null);e.default=n.exports}}]);