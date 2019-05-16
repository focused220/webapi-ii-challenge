const express = require('express');

const server = express();

const PostRouter = require('./post-router.js');

server.use(express.json());



server.use('/api/posts', PostRouter);

server.get('/', (req, res) => {
    res.send(
        `<h1>Post Router</h1>`
    )
})

module.exports = server;