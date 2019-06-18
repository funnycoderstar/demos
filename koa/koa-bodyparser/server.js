const Koa = require("koa");
const app = new Koa();
const route = require('koa-route');
var bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

app.use(bodyParser()); // 处理post请求的参数

const login = ctx => {
    const req = ctx.request.body;
    console.log(req);
    const userName = req.userName;
    ctx.response.body = {
        data: {
            userName,
        },
        msg: '登陆成功'
    };
}
app.use(cors());
app.use(route.post('/login', login));
app.listen(3200, () => {
    console.log('启动成功');
});
