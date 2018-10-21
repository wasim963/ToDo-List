const route = require('express').Router();
const db = require('../db');

route.get('/todos', (req, res) => {
    db.getTodos()
        .then(function (todos) {
            res.send(todos);
        })
        .catch(function (err) {
            res.send(err);
        })
});

route.post('/todos', (req, res) => {
    db.addNewTodo(req.body.task)
        .then(function () {
            res.redirect('/api/todos');
            //res.send("added");
        })
        .catch(function (err) {
            res.send(err);
        })
});

route.put('/todos', (req,res) => {
    db.flipDone(req.body.id)
        .then(function () {
           // res.redirect('/api/todos');
            res.send("Updated");
        })
        .catch(function (err) {
            res.send(err)
        })
});

route.put('/todos/moveupdown', (req,res) => {
    db.moveUpDown(req.body.id, req.body.task, req.body.done)
        .then(function () {
            res.send("Moved Up");
        })
        .catch(function (err) {
            res.send(err)
        })
});

route.delete('/todos', (req,res) => {
    db.removeOneTodo(req.body.id)
        .then(function () {
           // res.redirect('/api/todos');
            res.send("removed");
        })
        .catch(function (err) {
            res.send(err);
        })
});

route.delete('/todos/many', (req,res) => {
    db.removeSelected(req.body.done)
        .then(function () {
           //res.redirect('/api/todos');
            res.send("removed selected");
        })
        .catch(function (err) {
            res.send(err);
        })
});

module.exports=route;
