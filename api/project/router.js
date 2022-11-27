const express = require('express');
const project = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    await project.getAll()
        .then(projects=> {
            projects.map(project => {
                project.project_completed === 0 ? project.project_completed = false
                    : project.project_completed = true
            })
            res.status(200).json(projects)
        })
        .catch(next)
});

router.post('/', (req, res, next) => {
    project.add(req.body)
    .then(newProject => {
        if (newProject[newProject.length-1].project_completed == 0){
            newProject[newProject.length-1].project_completed = false;
            res.status(201).json(newProject[newProject.length-1]);
        }else {
            newProject[newProject.length-1].project_completed = true;
            res.status(201).json(newProject[newProject.length-1]);
        }
    })
    .catch(next);
});


module.exports = router;