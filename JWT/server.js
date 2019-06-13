const Koa = require("koa");
const app = new Koa();
const route = require('koa-route');
var bodyParser = require('koa-bodyparser');
const jwt = require('jwt-simple');
const cors = require('@koa/cors');

const secret = 'your_secret_string'; // 加密用的SECRET字符串，可随意更改
app.use(bodyParser()); // 处理post请求的参数

const login = ctx => {
    // ctx.set('Access-Control-Allow-Origin', '*');

    const req = ctx.request.body;
    const userName = req.userName;
    const expires = Date.now() + 3600000; // 设置超时时间为一小时后
    
    var payload = { 
        iss: userName,
        exp: expires
    };
    const Token = jwt.encode(payload, secret);
    ctx.response.body = {
        data: Token,
        msg: '登陆成功'
    };
}
const getUserName = ctx => {
    console.log(ctx);

    console.log(6666);
    // ctx.set('Access-Control-Allow-Origin', '*');
    const reqHeader = ctx.request.headers;
   
    const token = reqHeader.authorization.split(" ")[1];
    var decoded = jwt.decode(token, secret);
    ctx.response.body = {
        data: {
            username: decoded.iss,
        },
        msg: '获取用户名成功'
    };
}
app.use(cors());
app.use(route.post('/login', login));
app.use(route.get('/getUsername', getUserName));
app.listen(3200, () => {
    console.log('启动成功');
});
