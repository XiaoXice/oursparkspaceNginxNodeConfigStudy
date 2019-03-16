let Router = require("koa-router");
let route = new Router();
let controller = require("../controller");

route.get("/", controller.index);
route.post("/login", controller.login);
route.get("/message", controller.message.getMessageList);
route.post("/message", controller.message.creatMessage);
route.get("/message/:id/commit",controller.commit.getMessage);
route.post("/message/:id/commit",controller.commit.creatCommit);
route.post("/message/:id/like",controller.message.like);
route.delete("/message/:id/like",controller.message.disLike);

module.exports = route;