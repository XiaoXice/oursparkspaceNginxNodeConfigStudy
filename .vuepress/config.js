module.exports={
    title:'平台开发文档',
    description:'为了更好的开发',
    path:'/./',
    base: "/oursparkspaceNginxNodeConfigStudy/",
    themeConfig:{
        nav:[
            {text:'主页',link:'/'},
            {text:'基础知识',link:'/Basic/'},
            {text:'实践环节',link:'/practice/'},
        ],
        sidebar:{
            "/Basic/": [
                '/Basic/1.1 教程简介',
                '/Basic/1.2 基础知识 -- 后端',
                {
                    title: "1.3 NodeJS入门",
                    collapsable: false,
                    children:[
                        '/Basic/1.3 NodeJS 入门/1.3.1 NodeJS 基础',
                        '/Basic/1.3 NodeJS 入门/1.3.2 代码的组织和部署',
                        '/Basic/1.3 NodeJS 入门/1.3.3 文件操作',
                        '/Basic/1.3 NodeJS 入门/1.3.4 网络操作',
                        '/Basic/1.3 NodeJS 入门/1.3.5 进程管理',
                        '/Basic/1.3 NodeJS 入门/1.3.6 异步编程',
                        '/Basic/1.3 NodeJS 入门/1.3.7 Promise和async await'
                    ]
                },{
                    title: "1.4 Mongodb 入门",
                    collapsable: false,
                    children:[
                        "/Basic/1.4 Mongodb 入门/1.4.1 MongoDB 基础",
                        "/Basic/1.4 Mongodb 入门/1.4.2 进行简单的增删改查",
                        "/Basic/1.4 Mongodb 入门/1.4.3 索引",
                    ]
                }
            ],
            "/practice/": [
                {
                    title: "2.1 后端分模块实践",
                    collapsable: false,
                    children:[
                       "/practice/2.1 后端分模块实践/2.1 后端整体设计",
                       "/practice/2.1 后端分模块实践/2.1.1 Mongoose 实战",
                       "/practice/2.1 后端分模块实践/2.1.2 Koa 实战"
                    ]
                },{
                    title: "2.2 后端架构",
                    collapsable: false,
                    children:[
                        "/practice/2.2 后端架构/2.2 后端架构",
                        "/practice/2.2 后端架构/2.2.1 Koa抬手式",
                        "/practice/2.2 后端架构/2.2.2 Mongoose静态方法构建",
                        "/practice/2.2 后端架构/2.2.3 Koa路由和业务逻辑",
                        "/practice/2.2 后端架构/2.2.4 开发调试"
                    ]
                },{
                    title: "2.3 微信小程序配套简介",
                    collapsable: false,
                    children:[
                        "/practice/2.3 微信小程序配套简介/2.3 微信小程序配套简介",
                        "/practice/2.3 微信小程序配套简介/2.3.1 前端的分层架构",
                    ]
                }
            ]
        },
        sidebarDepth: 2,
        markdown: {
            lineNumbers: true,
            config: md => {
                md.use('markdown-it-task-lists');
            },
        },
        repo: 'https://github.com/XiaoXice/oursparkspaceNginxNodeConfigStudy',
        docsBranch: 'doc',
        editLinks: true,
    },
    
}