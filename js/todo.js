// When document is ready, load any existing tasks.
$(document).ready(function () {
    $.ajax({
        url: 'api.php',
        method: 'GET',
        data: { method: 'getTasks' },
        responseType: 'json',
        success: function (response) {
            if ( !response.count ) {
                showNoTasksMessage();
            }
            response.forEach(task => {
                addCurrentTask(task.id, task.title, task.completed);
            });
        },
        error: function () {
            // Handle error
            alert('Error adding task.');
        }
    });
});

// Show the "no tasks" message if there are no tasks
function showNoTasksMessage() {
   $('#noTasksMessage').show();
   $('#taskInput').focus();
}

// If the enter key is pressed in the input field, trigger the click event of the button
$('#taskInput').on('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        $('#addTaskButton').click();
    }
});

// Add a task!
$('#addTaskButton').click(function () {
    var taskText = $('#taskInput').val().trim();
    if (taskText !== '') {
        // Ajax it in...
        $.ajax({
            url: 'api.php',
            method: 'POST',
            data: { method: 'addTask', taskText: taskText },
            responseType: 'json',
            success: function (response) {
                // Handle success
                $('#taskInput').val('');
                addCurrentTask(response.id, taskText);
            },
            error: function () {
                // Handle error
                alert('Error adding task.');
            }
        });
    }
});

// This is used for adding a text interactively, or when first loading existing saved tasks
function addCurrentTask(taskId, taskText, taskCompleted = false) {
    const checkedAttribute = taskCompleted ? 'checked' : '';
    const taskItem = `
    <li class="list-group-item" id="task-${taskId}">
        <input class="form-check-input complete-task-button" type="checkbox" value="" data-task-id="${taskId}" id="tasklbl-${taskId}" ${checkedAttribute}>
        <label class="form-check-label px-2" for="tasklbl-${taskId}">
            ${taskText}
        </label>
        <button type="button" class="btn btn-danger btn-sm float-end delete-task-button" data-task-id="${taskId}">
            Delete
        </button>
    </li>
    `;
    $('#taskList').append(taskItem);
    $('#noTasksMessage').hide();
}

// Delete a task
$('#taskList').on('click', '.delete-task-button', function() {
    const taskId = $(this).data('task-id');
    $.ajax({
        url: 'api.php',
        method: 'POST',
        data: { method: 'deleteTask', taskId: taskId },
        responseType: 'json',
        success: function (response) {
            $(`#task-${taskId}`).remove();
            // How many are left?
            if ($('#taskList li').length === 0) {
                showNoTasksMessage();
            }
        },
        error: function () {
            // Handle error
            alert('Error adding task.');
        }
    });
});

// Complete or uncomplete a task
$('#taskList').on('click', '.complete-task-button', function() {
    const taskId = $(this).data('task-id');
    const taskCompleted = $(this).is(':checked');
    $.ajax({
        url: 'api.php',
        method: 'POST',
        data: { method: 'completeTask', taskId: taskId, taskCompleted: taskCompleted },
        responseType: 'json',
        success: function (response) {
            // Nothing to do here
        },
        error: function () {
            // Handle error
            alert('Error completing task.');
        }
    });
});