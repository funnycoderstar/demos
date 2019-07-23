const visitor = {
    Identifier(path) {
        console.log(path);
        const name = path.node.name;
        path.node.name = name
            .split("")
            .reverse()
            .join("");
    },
}

module.exports = function(babel) {
    return {
        visitor
    }
}
