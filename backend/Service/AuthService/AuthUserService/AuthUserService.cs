using backend.Model;
namespace backend.Service.AuthService.AuthUserService
{
    public class AuthUserService : IAuthUserService
    {
        public static readonly List<SignInUser> users = new List<SignInUser>()
        {
            new SignInUser { ID = 1, Username = "admin", Password = "admin" },
            new SignInUser { ID = 2, Username = "user", Password = "user" }
        };
        public void AddUser(SignInUser user)
        {
            if (users.Any(u => u.Username == user.Username))
            {
                throw new Exception("User already exists");
            }
            else
            {
                users.Add(user);
            }
        }
        public bool IsAuthUser(LoginUser user)
        {
            var existingUser = users.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);
            return existingUser != null;
        }
    }
}