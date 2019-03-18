let config = {
    mongoDBUrl: "mongodb://127.0.0.1:27017/message",
    port: 3000,
    host: "127.0.0.1",
    WX_APPID: "",
    WX_secretKey: ""
};
let mongoose = require("mongoose");
mongoose.connect(config.mongoDBUrl, {
    autoIndex: false,
    useNewUrlParser: true
}).catch(err => {
    console.log("Can't connect to database.");
    console.error(`Details: ${err.message}`);
    global.process.exit(-1);
});
// 定义各种架构
let 用户架构 = new mongoose.Schema({
    openID: {
        type: String,
        index: true
    },
    sessionKey: String,
    nickName: String,
    avatarUrl: String,
    messageList: [{
        type: mongoose.ObjectId,
        ref: "message"
    }],
    commitLIst: [{
        type: mongoose.ObjectId,
        ref: "commit"
    }],
});

用户架构.static("登记或更新用户", function (微信返回数据) {
    return this.findOne({ openID: 微信返回数据.openId }).exec()
        .then(查询返回文档 => {
            if (查询返回文档 == null) {
                return new this({
                    openID: 微信返回数据.openId,
                    sessionKey: 微信返回数据.sessionKey,
                    nickName: 微信返回数据.nickName,
                    avatarUrl: 微信返回数据.avatarUrl,
                    messageList: [],
                    commitLIst: []
                }).save();
            } else {
                return 查询返回文档.updateOne({
                    sessionKey: 微信返回数据.sessionKey,
                    nickName: 微信返回数据.nickName,
                    avatarUrl: 微信返回数据.avatarUrl
                }).exec().then(() => 查询返回文档);
            }
        });
});

let 用户模型 = mongoose.model("user", 用户架构);

let 留言架构 = new mongoose.Schema({
    author: {
        type: mongoose.ObjectId,
        ref: "user"
    },
    content: String,
    like: [{
        type: mongoose.ObjectId,
        ref: "user"
    }],
    commitList: [{
        type: mongoose.ObjectId,
        ref: "commit"
    }]
}, {
        timestamps: {
            createdAt: 'creationTime',
            updatedAt: 'updateTime'
        }
    });

留言架构.static("获取所有留言", function (用户的ID, 页面 = 1, 数量, sort = {}) {
    return this.find({})
        .setOptions({ skip: (页面 - 1) * 数量, 数量, sort })
        .populate("author", "_id nickName avatarUrl")
        .populate("like", "_id nickName avatarUrl")
        .exec()
        .then(查询返回留言们 => {
            return 查询返回留言们.map(一个留言 => {
                一个留言 = 一个留言.toObject();
                if (一个留言.like.map(喜欢这个留言的一个用户 => 喜欢这个留言的一个用户._id.toString()).indexOf(用户的ID.toString()) > -1)
                    一个留言.liked = true;
                else
                    一个留言.liked = false;
                return 一个留言;
            })
        });
});

留言架构.static("添加留言", function (用户的ID, 评论内容) {
    return 用户模型.findById(用户的ID).exec()
        .then(async 找到的用户 => {
            if (找到的用户 == null) throw new Error(`Can't find this user ${用户的ID}`);
            let 一个新的留言 = await new this({ author: 用户的ID, content: 评论内容 }).save();
            if (找到的用户.messageList == null) 找到的用户.messageList = [];
            找到的用户.messageList.unshift(一个新的留言._id);
            await 找到的用户.save();
            return 一个新的留言;
        });
});
留言架构.static("获取留言的详细内容", function (留言的ID) {
    return this.findById(留言的ID)
        .populate("author", "_id nickName avatarUrl")
        .populate("commitList")
        .exec()
        .then(async 留言 => {
            let 需要添加作者详细信息的评论 = 留言.commitList.map(评论 => {
                评论 = 评论.toObject();
                return 用户模型.findById(评论.author).select("nickName avatarUrl _id").exec()
                    .then(被找到的作者 => {
                        评论.author = 被找到的作者;
                        return 评论;
                    })
            })
            留言.commitList = await Promise.all(需要添加作者详细信息的评论);
            return 留言;
        });
});
留言架构.methods.喜欢 = async function (用户的ID) {
    if (this.like.map(喜欢这个留言的一个用户 => 喜欢这个留言的一个用户.toString()).indexOf(用户的ID.toString()) == -1)
        this.like.unshift(用户的ID);
    else
        return null;
    return await this.save();
};
留言架构.methods.取消喜欢 = async function (用户的ID) {
    let 序号 = this.like.map(喜欢这个留言的一个用户 => 喜欢这个留言的一个用户.toString()).indexOf(用户的ID.toString())
    if (序号 > -1)
        this.like.splice(序号, 1);
    else
        return null;
    return await this.save();
};
留言架构.methods.添加评论 = function (用户的ID, 内容) {
    return 用户模型.findById(用户的ID).exec()
        .then(async 找到的用户 => {
            if (找到的用户 == null) throw new Error(`Can't find this user ${用户的ID}`);
            let 新的评论 = await new 评论模型({ author: 用户的ID, content: 内容 })
            if (找到的用户.commitList == null) 找到的用户.commitList = [];
            找到的用户.commitList.unshift(新的评论._id);
            if (this.commitList == null) this.commitList = [];
            this.commitList.unshift(新的评论._id);
            await Promise.all([找到的用户.save(), this.save()]);
            return 新的评论.save();
        });
};
let 留言模型 = mongoose.model("message", 留言架构);

let 评论架构 = new mongoose.Schema({
    author: {
        type: mongoose.ObjectId,
        ref: "user"
    },
    content: String,
    followList: [{
        type: mongoose.ObjectId,
        ref: "commit"
    }]
}, {
        timestamps: {
            createdAt: 'creationTime',
            updatedAt: 'updateTime'
        }
    });
let 评论模型 = mongoose.model("commit", 评论架构);

let express框架 = require('express');
let 应用 = express框架();

let 提交参数解析模块 = require('body-parser');
let cookie解析模块 = require('cookie-parser');
let session = require('express-session');

应用.use(提交参数解析模块.urlencoded({ extended: false }));
应用.use(提交参数解析模块.json());
应用.use(cookie解析模块())
应用.use(session({
    secret: '12345',
    name: 'session',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    resave: false,
    saveUninitialized: true,
}));

const request = require("request");
class 发送请求 {
    /**
     * promise化request
     * @param {object} opts 
     * @return {Promise<[]>}
     */
    static promiseReq(opts = {}) {
        return new Promise((resolve, reject) => {
            request(opts, (e, r, d) => {
                if (e) {
                    return reject(e);
                }
                if (r.statusCode != 200) {
                    return reject(`back statusCode：${r.statusCode}`);
                }
                return resolve(d);
            });
        })
    };
};
var crypto = require('crypto')

function 微信返回数据解码(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
}

微信返回数据解码.prototype.解码 = function (encryptedData, iv) {
    // base64 decode
    var sessionKey = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')

        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer')
    }

    return decoded
}
应用.use((请求,返回, 继续) => {
    if (请求.path == "/login") return 继续();
    if (请求.session.user) return 继续();
    返回.json(403, { code: 403, msg: "令牌无效，请重新登录！" });
    return;
})
let sha1 = require("sha1");
应用.post("/login", async function (请求, 回复) {
    let appId = config.WX_APPID;
    let secret = config.WX_secretKey;
    let { encryptedData, iv, js_code, rawData, signature } = 请求.body;
    // 获取session_key
    let opts = {
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`
    }
    let r1 = await 发送请求.promiseReq(opts);
    let { session_key } = JSON.parse(r1);
    if (!session_key) {
        回复.send(401, "登录令牌无效");
        return;
    }
    // 数据签名校验
    let signature2 = sha1(rawData + session_key);
    if (signature != signature2) {
        回复.send(400, "数据签名校验失败");
        return;
    };
    // 解密
    let 解码对象 = new 微信返回数据解码(appId, session_key)

    let 数据 = 解码对象.解码(encryptedData, iv)
    数据.sessionKey = session_key;
    请求.session.user = await 用户模型.登记或更新用户(数据);
    // console.log('解密后 data: ', data)
    回复.json({
        _id: 请求.session.user._id,
        code: 200,
        msg: "登陆成功"
    });
});
应用.get("/message", async function (请求, 回复) {
    try {
        let 所有的留言 = await 留言模型.获取所有留言(请求.session.user._id, 请求.query.page, 20);
        回复.json(所有的留言);
    } catch (错误) {
        console.error(错误);
        回复.send(500);
        return;
    }
});
应用.post("/message",async function(请求, 回复){
    try {
        let 新的留言 = await 留言模型.添加留言(请求.session.user._id, 请求.body.content);
        回复.status(201).json({
            code: 201,
            messageId: 新的留言.id
        })
    } catch (错误) {
        console.error(错误);
        回复.send(500);
        return;
    }
})
应用.get("/message/:id/commit",async function (请求, 回复) {
    try {
        let 查到的结果 = await 留言模型.获取留言的详细内容(请求.params.id);
        回复.json(查到的结果);
    } catch (错误) {
        console.error(错误);
        回复.send(500);
        return;
    }
});
应用.post("/message/:id/commit",async function(请求, 回复){
    try {
        let 一个留言 = await 留言模型.findById(请求.params.id).exec();
        let 新的评论 = await 一个留言.添加评论(请求.session.user._id, 请求.body.content);
        回复.status(201).json({
            code: 201,
            messageId: 新的评论.id
        })
    } catch (错误) {
        console.error(错误);
        回复.send(500);
        return;
    }
});
应用.post("/message/:id/like",async function(请求, 回复){
    try {
        let 一个留言 = await 留言模型.findById(请求.params.id).exec();
        let 返回值 = await 一个留言.喜欢(请求.session.user._id);
        if (返回值 == null) {
            回复.status(403).json({
                code: 403,
                msg: "你已经喜欢过了"
            })
        } else {
            回复.status(201).json({
                code: 201,
                msg: "成功"
            })
        }
        return;
    } catch (错误) {
        console.error(错误);
        回复.send(500);
        return;
    }
});
应用.delete("/message/:id/like",async function (请求, 回复) {
    try {
        let 一个留言 = await 留言模型.findById(请求.params.id).exec();
        let 返回值 = await 一个留言.取消喜欢(请求.session.user._id);
        if (返回值 == null) {
            回复.status(403).json({
                code: 403,
                msg: "你并不经喜欢这个"
            })
        } else {
            回复.json({
                code: 200,
                msg: "成功"
            })
        }
        return;
    } catch (错误) {
        console.error(错误);
        回复.send(500);
        return;
    }
});

应用.listen(config.port,config.host);