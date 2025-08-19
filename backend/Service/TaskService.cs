using Model;

namespace Service
{
    public class TaskService : ITaskService
    {
        public static List<UserTasks> tasks = new List<UserTasks>()
        {
            new UserTasks { ID = 1, Title = "Task 11", Completed = false },
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
                throw new ArgumentNullException(nameof(task), "Task cannot be null");

            // ✅ Ensure unique ID
            task.ID = tasks.Any() ? tasks.Max(static t => t.ID) + 1 : 1;
            task.Completed = false;
            tasks.Add(task);
        }

        public void UpdateTask(UserTasks task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task), "Task cannot be null");

            var existingTask = tasks.FirstOrDefault(t => t.ID == task.ID);
            if (existingTask == null)
                throw new KeyNotFoundException($"Task with ID {task.ID} not found.");

            existingTask.Title = task.Title;
            existingTask.Completed = task.Completed;
        }

        public void DeleteTask(int id)
        {
            var task = tasks.FirstOrDefault(t => t.ID == id);
            if (task == null)
                throw new KeyNotFoundException($"Task with ID {id} not found.");

            tasks.Remove(task);
        }
    }
}
