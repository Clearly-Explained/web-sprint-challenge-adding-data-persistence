const router = require('express').Router();
const db = require('./model');

router.get('/', (req, res, next) => {
    db.getAll()
        .then(resource=> {
            res.status(200).json(resource);
        })
        .catch(next)
})


router.post('/', (req, res, next) => {
    db.add(req.body)
        .then(newResource => {
            res.status(201).json(newResource[newResource.length -1])
        })
        .catch(next)
})

module.exports = router;