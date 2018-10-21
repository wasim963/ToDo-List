let todos = [];
$(function () {
    const inputTask = $('#task');
    const addBtn = $('#addBtn');
    const list = $('#list');
    const delBtn = $('#delBtn');

    function refreshPage() {

        list.empty();
        for (i in todos) {
            let div = createelement(+i);
            list.append(div);
        }
    }

    function moveup(i) {
        if(i>=1){
            let taskl = todos[i].task; let tasku  = todos[i-1].task;
            let donel = todos[i].done; let doneu = todos[i-1].done;
            let idl =   todos[i].id;   let idu = todos[i-1].id;
            $.ajax({
                url: '/api/todos/moveupdown',
                type: 'put',
                data: {id: idu, task: taskl, done: donel},
                success: function (data) {

                }
            });
            $.ajax({
                url: '/api/todos/moveupdown',
                type: 'put',
                data: {id: idl, task: tasku, done: doneu},
                success: function (data) {

                }
            });
            $.get('/api/todos', function (data) {
                todos = data;
                refreshPage(todos);
            });

        }
    }

    function movedown(i) {
        if(i<todos.length-1){
            let tasku = todos[i].task; let taskl  = todos[i+1].task;
            let doneu = todos[i].done; let donel =  todos[i+1].done;
            let idu =   todos[i].id;   let idl =    todos[i+1].id;
            $.ajax({
                url: '/api/todos/moveupdown',
                type: 'put',
                data: {id: idu, task: taskl, done: donel},
                success: function (data) {

                }
            });
            $.ajax({
                url: '/api/todos/moveupdown',
                type: 'put',
                data: {id: idl, task: tasku, done: doneu},
                success: function (data) {

                }
            });
            $.get('/api/todos', function (data) {
                todos = data;
                refreshPage(todos);
            });

        }
    }

    function remove(i) {
        let id = todos[i].id;
        $.ajax({
            url: '/api/todos',
            type: 'DELETE',
            data: {id : id},
            success: function (results) {

                     }
            });
        todos.splice(i, 1);
        refreshPage();
    }

    function toggle(i) {
        let id = todos[i].id;
        $.ajax({
            url: '/api/todos',
            type: 'put',
            data: {id : id},
            success: function (result) {

            }
        });
        $.get('/api/todos', function (data) {
            todos = data;
            refreshPage(todos);
        });
    }

    function createelement(i) {
        let div = $(`<div class="row mt-1"></div>`);
        let checkDiv =$(`<div class="col-1 offset-1"></div>`);

        let checkbox = $(`<input type="checkbox">`);
        checkbox.css("margin-top","5px");
        checkbox.click(function () {
             toggle(i);
        });

        let taskBox = $(`<div class="col-4">${todos[i].task}</div>`);

        if(todos[i].done==true){
            taskBox.css("text-decoration","line-through");
        }

        let iconup=$(`<div class="col-1"><button class="btn btn-success"><i class="fa fa-chevron-up"></i></button></div>`).click(function(){
            moveup(i);
        });

        let icondown=$(`<div class="col-1"><button class="btn btn-success"><i class="fa fa-chevron-down"></i></button></div>`).click(function(){
            movedown(i);
        });

        let rem = $(`<div class="col-1"><button class="btn btn-danger"><i class="fa fa-times"></i></button></div>`).click(function () {
            remove(i);
        });

        div.append(checkDiv).append(checkbox).append(taskBox).append(iconup).append(icondown).append(rem);
        return div;
    }

    $.get('/api/todos', function (data) {
       // console.log(data);
        todos = data;
        refreshPage(todos);
    });

    addBtn.click(function () {
        $.post('/api/todos',
            {
                task: inputTask.val() ,
            },
            function (data) {
                todos = data;
                refreshPage();
            })
        inputTask.val(" ");
    });

    delBtn.click(function () {
          var doneArr = todos.filter(row => {return row.done==1;});

          if(doneArr.length >=1){
              let done = doneArr[0].done;
              $.ajax({
                  url: '/api/todos/many',
                  type: 'delete',
                  data: {done : done},
                  success: function (result) {

                  }
              });
              $.get('/api/todos', function (data) {
                  todos = data;
                  refreshPage(todos);
              });
          }
    })

});