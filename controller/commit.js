let message = require("../sql/message");
let commit = require("../sql/commit");

let getMessage = async (ctx, next) => {
    try {
        let theMessage = await message.getMessage(ctx.params.id);
        ctx.response.status = 200;
        ctx.response.body = theMessage;
        return next();
    } catch (e) {
        console.error(e);
        ctx.throw(500);
        return;
    };
};
let creatCommit = async (ctx, next) => {
    try {
        let msg = await message.findById(ctx.params.id).exec();
        let newCommit = await msg.addCommit(ctx.session.user._id, ctx.request.body.content);
        ctx.response.status = 201;
        ctx.response.body = {
            code: 201,
            messageId: newCommit.id
        };
        return next();
    } catch (e) {
        console.error(e);
        ctx.throw(500);
        return;
    }
}

module.exports = {
    getMessage,
    creatCommit
}