using Model;
namespace Service
{
    public interface ITaskService
    {
        public List<UserTasks> GetAllTasks();
        public void AddTask(UserTasks task);

    }
}