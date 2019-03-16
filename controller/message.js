let message = require("../sql/message");
let creatMessage = async (ctx, next) => {
    try {
        let newMsg = await message.addMsg(ctx.session.user._id, ctx.request.body.content);
        ctx.response.status = 201;
        ctx.response.body = {
            code: 201,
            messageId: newMsg.id
        };
        return next();
    } catch (e) {
        ctx.throw(500);
        console.error(e);
        return;
    }
}
let getMessageList = async (ctx, next) => {
    try {
        let messages = await message.getMessageList(ctx.session.user._id, ctx.request.query.page, 20);
        ctx.response.status = 200;
        ctx.response.body = messages
        return next();
    } catch (e) {
        console.error(e);
        ctx.throw(500);
        return;
    }
};
let like = async (ctx, next) => {
    try {
        let msg = await message.findById(ctx.params.id).exec();
        let res = await msg.likeIt(ctx.session.user._id);
        if (res == null) {
            ctx.response.status = 403;
            ctx.response.body = {
                code: 403,
                msg: "你已经喜欢过了"
            };
        } else {
            ctx.response.status = 201;
            ctx.response.body = {
                code: 201,
                msg: "成功"
            }
        }
        return next();
    } catch (e) {
        console.error(e);
        ctx.throw(500);
        return;
    }
};
let disLike = async (ctx, next) => {
    try {
        let msg = await message.findById(ctx.params.id).exec();
        let res = msg.unlikeIt(ctx.session.user._id);
        if (res == null) {
            ctx.response.status = 403;
            ctx.response.body = {
                code: 403,
                msg: "你并不经喜欢这个"
            };
        } else {
            ctx.response.status = 200;
            ctx.response.body = {
                code: 200,
                msg: "成功"
            }
        }
        return next();
    } catch (e) {
        console.error(e);
        ctx.throw(500);
        return;
    }
}
module.exports = {
    creatMessage,
    getMessageList,
    like,
    disLike
}