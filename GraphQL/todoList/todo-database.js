const storage = new Map();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const todosSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    done: {
        type: Boolean,
    }
})
const Todos = mongoose.model('todos', todosSchema);

module.exports = {
    async add(content) {
        const newTodo = {
            content,
            done: false,
        }
        const result = await Todos.create(newTodo);
        return result;
    },
    async done(id, status) {
        const condition = {
            _id: id
        };
        const result = await Todos.findOne(condition);
        const newValue = {
            $set: {
                done: status
            }
        };
        if (result) {
            await Todos.update(condition, newValue);
            return true;
        }
        return false;
    },
    async remove(id) {
        const condition = {
            _id: id
        };
        try {
            await Todos.remove(condition);
            return true;
        } catch(err) {
            console.log('删除失败', err);
            return false;
        }
    },
    async get(id) {
        const result = await Todos.findOne({
            _id: id,
        });
        return result;
    },
    async getAll() {
        const result = await Todos.find({});
        return result;
    }
}
