const db = require('../../data/dbConfig');

function getAll() {
    return db('tasks as t')
    .join('projects as p', 'p.project_id', 't.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')
}

async function add(task) {
    const [task_id] = await db('tasks').insert(task);
    return getAll().where({ task_id }).first();
}


module.exports = {
    getAll,
    add,
};