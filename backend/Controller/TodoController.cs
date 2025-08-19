using Microsoft.AspNetCore.Mvc;
using Service;
using Model;

namespace Controller
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
        public readonly ITaskService _taskService;
        public TodoController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            try
            {
                var tasks = _taskService.GetAllTasks();
                if (tasks == null || tasks.Count == 0)
                {
                    return NotFound("No tasks found.");
                }
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                // Log the exception (not implemented here)
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPost]
        public IActionResult AddTask([FromBody] UserTasks task)
        {
            _taskService.AddTask(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] UserTasks task)
        {
            if (task == null || task.ID != id)
            {
                return BadRequest("Task ID mismatch or task is null.");
            }

            _taskService.UpdateTask(task);
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            try
            {
                _taskService.DeleteTask(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Task with ID {id} not found.");
            }
            catch (Exception ex)
            {
                // Log the exception (not implemented here)
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}