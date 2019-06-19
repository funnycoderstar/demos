const Koa = require('koa');
const Router = require('koa-router');
const Json = require('koa-json');
const BodyParser = require('koa-bodyparser');
const TodoStorage = require('./todo-database');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

router.get('/todos', async (ctx) => {
    ctx.body = await TodoStorage.getAll();
})
router.post('/todo', async (ctx) => {
    const newTodo = await TodoStorage.add(ctx.request.body.content);
    ctx.status = 201;
    ctx.body = newTodo;
})
router.del('/todo', async (ctx) => {
    try {
        const result = await TodoStorage.remove(ctx.request.body._id);
        ctx.status = 200;
        ctx.body = {
            message: '删除成功'
        };
    } catch {
        ctx.status = 400;
        ctx.body = {
            errMsg: '删除失败'
        };
    }
    
})
router.put('/todo', async (ctx) => {
    const {_id, done} = ctx.request.body;
    await TodoStorage.done(_id, done);
    ctx.body = await TodoStorage.get(_id);
})
app.use(cors());
app.use(Json());
app.use(BodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4001, () => {
    console.log('Running a restful API server at http://localhost:4100')
});