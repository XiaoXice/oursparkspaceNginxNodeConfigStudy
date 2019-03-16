let mongoose = require("mongoose");
let schema = require("./index");
schema.userSchema.static("getUserByOpenId", function (openId) {
    return this.findOne({ openID: openId }).select("-sessionKey").populate("messageList commitLIst").exec()
});
schema.userSchema.static("updateUserData", function (userId, nickName, avatarUrl, sessionKey) {
    return this.findByIdAndUpdate(userId, { nickName, avatarUrl, sessionKey }).exec();
});
schema.userSchema.static("loginUser", function (wechatData) {
    return this.findOne({ openID: wechatData.openId }).exec()
        .then(doc => {
            if (doc == null) {
                return new this({
                    openID: wechatData.openId,
                    sessionKey: wechatData.sessionKey,
                    nickName: wechatData.nickName,
                    avatarUrl: wechatData.avatarUrl,
                    messageList: [],
                    commitLIst: []
                }).save();
            } else {
                return doc.update({
                    sessionKey: wechatData.sessionKey,
                    nickName: wechatData.nickName,
                    avatarUrl: wechatData.avatarUrl
                }).exec().then(() => doc);
            }
        });
})

module.exports = mongoose.model("user", schema.userSchema);