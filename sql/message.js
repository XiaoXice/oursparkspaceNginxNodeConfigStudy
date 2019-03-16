let mongoose = require("mongoose");
let schema = require("./index");
let user = require("./user");
let commit = require("./commit");
schema.messageSchema.static("getMessageList", function (userId, page = 1, limt, sort = {}) {
    return this.find({})
        .setOptions({ skip: (page - 1) * limt, limt, sort })
        .populate("author", "_id nickName avatarUrl")
        .populate("like","_id nickName avatarUrl")
        .exec()
        .then(docs => {
            return docs.map(message => {
                message = message.toObject();
                if (message.like.map(l => l._id.toString()).indexOf(userId.toString()) > -1)
                    message.liked = true;
                else
                    message.liked = false;
                return message;
            })
        });
});
schema.messageSchema.static("addMsg", function (authId, content) {
    return user.findById(authId).exec()
        .then(async doc => {
            if (doc == null) throw new Error(`Can't find this user ${authId}`);
            let aMessage = await new this({ author: authId, content }).save();
            if (doc.messageList == null) doc.messageList = [];
            doc.messageList.unshift(aMessage._id);
            await doc.save();
            return aMessage;
        });
});
schema.messageSchema.static("getMessage", function (messageId) {
    return this.findById(messageId)
        .populate("author", "_id nickName avatarUrl")
        .populate("commitList")
        .exec()
        .then(async doc => {
            let authPop = doc.commitList.map(commit => {
                commit = commit.toObject();
                return user.findById(commit.author).select("nickName avatarUrl _id").exec()
                    .then(author => {
                        commit.author = author;
                        return commit;
                    })
            })
            doc.commitList = await Promise.all(authPop);
            return doc;
        });
});
schema.messageSchema.methods.likeIt = async function (userId) {
    if (this.like.map(l => l.toString()).indexOf(userId.toString()) == -1)
        this.like.unshift(userId);
    else
        return null;
    return await this.save();
};
schema.messageSchema.methods.unlikeIt = async function (userId) {
    let index = this.like.map(l => l.toString()).indexOf(userId.toString())
    if (index > -1)
        this.like.splice(index, 1);
    else
        return null;
    return await this.save();
};
schema.messageSchema.methods.addCommit = function (authId, content) {
    return user.findById(authId).exec()
        .then(async doc => {
            if (doc == null) throw new Error(`Can't find this user ${authId}`);
            let aCommit = await new commit({ author: authId, content })
            if (doc.commitList == null) doc.commitList = [];
            doc.commitList.unshift(aCommit._id);
            if (this.commitList == null) this.commitList = [];
            this.commitList.unshift(aCommit._id);
            await Promise.all([doc.save(), this.save()]);
            return aCommit.save();
        });
};
module.exports = mongoose.model("message", schema.messageSchema);