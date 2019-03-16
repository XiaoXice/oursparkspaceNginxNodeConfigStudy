let user = require("../sql/user");
const Ut = require("../common/utils");
let WXBizDataCrypt = require('../common/WXBizDataCrypt')
const sha1 = require("sha1");
let config = require("../config");
module.exports = async (ctx, next) => {
    try {
        let appId = config.WX_APPID;
        let secret = config.WX_secretKey;
        let { encryptedData, iv, js_code, rawData, signature } = ctx.request.body;
        // 获取session_key
        let opts = {
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`
        }
        let r1 = await Ut.promiseReq(opts);
        let { session_key } = JSON.parse(r1);
        if (!session_key) {
            ctx.throw(401,"登录令牌无效");
            return next();
        }
        // 数据签名校验
        let signature2 = sha1(rawData + session_key);
        if (signature != signature2) {
            ctx.throw(400,"数据签名校验失败");
            return next();
        };
        // 解密
        let pc = new WXBizDataCrypt(appId, session_key)

        let data = pc.decryptData(encryptedData, iv)
        data.sessionKey = session_key;
        ctx.session.user = await user.loginUser(data);
        // console.log('解密后 data: ', data)
        ctx.response.body = {
            _id: ctx.session.user._id,
            code: 200,
            msg: "登陆成功"
        }
        return next();
    }
    catch (e) {
        console.error(e);
        ctx.throw(500, "我也不知道为啥错了，具体问题看后台提示");
    }
};
