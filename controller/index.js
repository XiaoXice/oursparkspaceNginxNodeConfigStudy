let index = async(ctx, next) => {
    console.log(ctx);
    ctx.response.status = 406;
    ctx.response.body = "there's nothing, go back";
    return next();
}

module.exports = {
    index,
    login: require("./login"),
    message: require("./message"),
    commit: require("./commit")
}