using Model;
namespace Service
{
    public interface ITaskService
    {
        public List<UserTasks> GetAllTasks();
        public void AddTask(UserTasks task);
        public void UpdateTask(UserTasks task);
        public void DeleteTask(int id);

    }
}