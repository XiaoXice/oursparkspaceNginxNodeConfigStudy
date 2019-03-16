let mongoose = require('mongoose');
let config = require("../config");
const {
    Schema
} = mongoose;
mongoose.connect(config.mongoDBUrl, {
    autoIndex: false,
    useNewUrlParser: true
}).catch(err => {
    console.log("Can't connect to database.");
    console.error(`Details: ${err.message}`);
    global.process.exit(-1);
});
let userSchema = new Schema({
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
let messageSchema = new Schema({
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
let commitSchema = new Schema({
    author:{
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
module.exports = {
    userSchema,
    commitSchema,
    messageSchema
}