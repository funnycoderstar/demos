const Koa = require('koa');
const {
    ApolloServer,
    gql
} = require('apollo-server-koa');
const TodoStorage = require('./todo-database');

const typeDefs = gql `
    type Todo {
        _id: String,
        content: String,
        done: Boolean,
    }
    type Query {
        todo: [Todo]
    }
    type Mutation {
        addTodo(content: String): Todo
        deleteTodo(_id: String): Boolean
        updateTodo(_id: String, done: Boolean): Todo
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        todo: () => {
            return TodoStorage.getAll();
        }
    },
    Todo: {
        _id: (todo) => {
            return todo._id;
        },
        content: (todo) => {
            return todo.content;
        },
        done: (todo) => {
            return todo.done;
        }
    },
    Mutation: {
        addTodo: (_, { content = '' }) => {
            return TodoStorage.add(content);
        },
        deleteTodo: (_, { _id = '' }) => {
            TodoStorage.remove(_id);
            return true;
        },
        updateTodo: (_, { _id = '', done = false }) => {
            TodoStorage.done(_id, done);
            return TodoStorage.get(_id);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const app = new Koa();
server.applyMiddleware({
    app
});

app.listen({
        port: 4000
    }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
