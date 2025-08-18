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
            return CreatedAtAction(nameof(GetAllTasks), new { id = task.ID }, task);
        }
    }


}