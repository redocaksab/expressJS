const express = require("express");
const router = express.Router();

let authors = require('./../authors');

// get all posts that a specific author has
router.get('/:authorId', (req, res) => {
    authors.forEach((item) => {
        if (item.id === req.params.authorId) {
            res.json(item.posts);
        }
    })
    res.sendStatus(500);
})

//get specific post by specific author
router.get('/:authorId/:postId', (req, res) => {
    authors.forEach((item) => {
        if (item.id === req.params.authorId) {
            if (item.posts[req.params.postId])
                res.json(item.posts[req.params.postId]);
        }
    })
    res.sendStatus(500);
})

module.exports = router