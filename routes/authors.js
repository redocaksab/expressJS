const express = require("express");
const router = express.Router();

let authors = require('./../authors');

const createError = require("http-errors");

// get all existing authors
router.get('/', (req, res) => {
    res.json(authors);
})

// checks if author with this id exists
router.post("*", validationPost, (req, res, next) => {
    authors.forEach((item) => {
        if (item.id == req.body.id) {
            next(createError(500, "author with such id already exists!"));
        }
    })

    next();
})

// add new author
router.post('/', (req, res) => {
    authors.push(req.body);
    res.json(authors);
});

// change author name
router.put('/:id', (req, res, next) => {
  let id = authors.find((item) => {
        if(item.id == req.params.id) {
            item.name = req.body.name;
            return true;
        }
    });
    if(id) {
        res.json(authors);
    } else {
        next(createError(500, "author is not found!"));
    }
});

//  remove author item
router.delete('/:id', (req, res, next) => {
    let index = authors.findIndex((item) => item.id === req.params.id);

    if(index != -1) {
        authors.splice(index, 1);
        res.json(authors);
    } else {
        next(createError(500, "nothing found!"));
    }
})


function validationPost(req, res, next) {
    if (req.body.id && req.body.name && req.body.posts) {
        next();
    }
    next(createError(500, "wrong properties!"));
}
module.exports = router