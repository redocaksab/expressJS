const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');

app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);

function errorHandler(err, req, res, next) {
    if(err.status) {
        res.status(err.status).json({err: err.message});
    } else {
         res.sendStatus(500);
    }
}

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});
