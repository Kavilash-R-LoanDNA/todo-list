namespace backend.Service.AuthService.AuthTokenService
{
    public interface IAuthTokenService
    {
        string GenerateToken(string username);
    }
}