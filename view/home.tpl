{include file="header.tpl"}

<div class="px-4 my-4 text-center">
   <img class="d-block mx-auto mb-4" src="img/todo.png" alt="" width="100" />
</div>

<div class="container">

   <div id="currentTasks" class="col-md-8 offset-md-2 mb-4">

      <div id="noTasksMessage" style="display:none;">
         <em class="text-center d-block w-100">Well done, there's nothing left to do!</em>
         <img src="img/dino.png" alt="Gaming Dinosaur" class="img-fluid d-block mx-auto my-2" width="200">
      </div>

      <ul class="list-group" id="taskList">
      </ul>

   </div>

   <div id="addTask" class="col-md-8 offset-md-2 mb-4">
      <div class="input-group">
         <input type="text" class="form-control" id="taskInput" placeholder="Another task to do...">
         <button class="btn btn-primary" id="addTaskButton" type="button">Add Task</button>
      </div>
   </div>   

{include file="footer.tpl"}