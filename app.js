const Koa = require("koa");
let bodyParser = require('koa-body');
const session = require("koa-session2");
let logger = require("koa-logger");
let route = require("./router");
let config = require("./config");
const app = new Koa();
app.use(session({ key: "session" }));
app.use(bodyParser({
    multipart: true,
    formLimit: "1.5mb"
}));
if (app.env == "development") {
    let cors = require("koa2-cors");
    app.use(cors({ credentials: true }));
    app.use(logger());
    app.use((ctx, next) => {
        if (ctx.request.method == "POST")
            console.log(ctx.request.body);
        return next();
    })
};
app.use((ctx, next) => {
    if (ctx.path == "/login") return next();
    if (ctx.session.user) return next();
    ctx.throw(403, { code: 403, msg: "令牌无效，请重新登录！" });
    return;
})
app.use(route.routes(), route.allowedMethods());
app.listen(config.port, config.host);