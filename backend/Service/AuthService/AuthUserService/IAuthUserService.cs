using backend.Model;
namespace backend.Service.AuthService.AuthUserService
{
    public interface IAuthUserService : IAuthService
    {
        void AddUser(SignInUser user);
        bool IsAuthUser(LoginUser user);
    }
}