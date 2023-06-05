$(document).ready(function(){
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=210',
      dataType: 'json',
      success: function (response, textStatus) {
        response.tasks.forEach(function (task) {
        $('#todo-list').append('<p>' + task.content + '</p>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });

    $.ajax({
        type: 'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=2',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: 'Do something fun'
          }
        }),
        success: function (response, textStatus) {
          console.log(response);
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });

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
            console.log(response);
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
  });