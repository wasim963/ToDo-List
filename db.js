const mysql=require('mysql2');

const connection=mysql.createConnection({
    host: 'localhost',
    database: 'webdev',
    user: 'myuser',
    password :'mypass'
});

function getTodos() {
    return new Promise(function (resolve,reject) {
        connection.query(`SELECT * from todos`,
            function (err,results) {
                if(err){
                    reject(err);
                }

                resolve(results);
            })
    })

}

function addNewTodo(task) {
    return new Promise(function (resolve,reject) {
        connection.query(`INSERT INTO todos (task) VALUES (?)`,
            [task],
            function (err,results) {
                if (err) {
                    reject(err)
                }

                resolve(results);
            })
    })

}

function removeOneTodo(id){
    return new Promise(function (resolve ,reject) {
        connection.query(`DELETE FROM todos WHERE id = ?`,
            [id],
            function (err,results) {
                if (err){
                    reject(err);
                }
                resolve(results);
            })
    })
}

function removeSelected(done){
    return new Promise(function (resolve,reject) {
        connection.query(`DELETE FROM todos WHERE done = ?`,
            [done],
            function (err,results) {
                if (err){
                    reject(err);
                }
                resolve(results)
            })
    })
}

function flipDone(id){
   // console.log(id+"Hi");
    return new Promise(function (resolve, reject) {
        connection.query(`UPDATE todos SET done = !done WHERE id = ?`,
            [id],
            function (err, results) {
                if (err){
                    reject(err)
                }
                resolve(results)
            })
    })
}

function moveUpDown(id,task,done){
    return new Promise(function (resolve,reject) {
        connection.query(`UPDATE todos SET task = ?, done = ?  WHERE id = ?`,
            [task,done,id],
            function (err, results) {
                if (err){
                    reject(err)
                }
                resolve(results)
            })
    })
}

module.exports={
    getTodos,
    addNewTodo,
    removeOneTodo,
    removeSelected,
    flipDone,
    moveUpDown
};