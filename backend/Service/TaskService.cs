using Model; 

namespace Service
{
    public class TaskService : ITaskService
    {
        List<UserTasks> tasks = new List<UserTasks>()
        {
            new UserTasks { ID = 1, Title = "Task 1", Completed = false },
            new UserTasks { ID = 2, Title = "Task 2", Completed = true },
            new UserTasks { ID = 3, Title = "Task 3", Completed = false }
        };
        public List<UserTasks> GetAllTasks()
        {
            return tasks;
        }

        public void AddTask(UserTasks task)
        {
            if (task == null)
            {
                throw new ArgumentNullException(nameof(task), "Task cannot be null");
            }
            task.ID = tasks.Count; // Assign a new ID based on the current count
            task.Completed = false; // Default new tasks to not completed
            tasks.Add(task);
        }
    }
}