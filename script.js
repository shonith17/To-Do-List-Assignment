$(document).ready(function(){
    var getAndDisplayAllTasks = function () {
      $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=210',
        dataType: 'json',
        success: function (response, textStatus) {
            $('#todo-list').empty();
            response.tasks.forEach(function (task) {
                $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><button class="delete" data-id="' + task.id + '">Delete</button>');
              });
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
    
    var createTask = function () {
      $.ajax({
        type: 'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=210',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: $('#new-task-content').val()
          }
        }),
        success: function (response, textStatus) {
        $('#new-task-content').val('');
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });  
    }
    
    $('#create-task').on('submit', function (e) {
      e.preventDefault();
      createTask();
    });
    

    var deleteTask = function (id) {
        $.ajax({
       type: 'DELETE',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=210',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }

      $(document).on('click', '.delete', function () {
        deleteTask($(this).data('id'));
      });

      // function will update the to-do object to active if the button is uclicked
      var markTaskComplete = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=210',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }

       // function will update the to-do object to active if the button is unclicked
       var markTaskActive = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=210',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }

      // listen  for the checkbox to be clicked and then run the functions to change the "active" or "completed" part of the to-do object.
      $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
           markTaskComplete($(this).data('id'));
         } else {
            markTaskActive($(this).data('id'));
          }
       });

      var getAndDisplayActiveTasks = function() {
        $.ajax({
          type: 'GET',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=210',
          dataType: 'json',
          success: function(response, textStatus) {
            $('#todo-list').empty(); // clear the html
            response.tasks.forEach(function(task) {
              if (!task.completed) {
                // only add items that have been not yet been completed
                $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><button class="delete" data-id="' + task.id + '">Delete</button>');
              }
            });
          },
          error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      };
      
      var getAndDisplayCompletedTasks = function() {
        $.ajax({
          type: 'GET',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=210',
          dataType: 'json',
          success: function(response, textStatus) {
            $('#todo-list').empty(); // clear the html
            response.tasks.forEach(function(task) {
              if (task.completed) {
                // only add items that have been completed
                $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><button class="delete" data-id="' + task.id + '">Delete</button>');
              }
            });
          },
          error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      };
      
      var sortTasksByDate = function() {
        $.ajax({
          type: 'GET',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=210',
          dataType: 'json',
          success: function(response, textStatus) {
            response.tasks.sort(function(a, b) {
              var dateA = new Date(a.date);
              var dateB = new Date(b.date);
              return dateA - dateB; //  sort by date
            });
      
            // add new sorted to-do's to html.
            $('#todo-list').empty();
            response.tasks.forEach(function(task) {
              $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><button class="delete" data-id="' + task.id + '">Delete</button>');
            });
          },
          error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      };

      // listen for the clicks of the buttons then run the functions.
      $('#sort').on('click', function() {
        sortTasksByDate();
      });

      $('#all').on('click', function() {
        getAndDisplayAllTasks();
      });
      
      $('#active').on('click', function() {
        getAndDisplayActiveTasks();
      });
      
      $('#completed').on('click', function() {
        getAndDisplayCompletedTasks();
      });

       getAndDisplayAllTasks();

  });