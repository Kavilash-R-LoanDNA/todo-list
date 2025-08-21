using backend.Model;
using backend.Service.AuthService.AuthTokenService;
using backend.Service.AuthService.AuthUserService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller.Auth
{
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        private readonly IAuthUserService _authUserService;
        private readonly IAuthTokenService _authTokenService;
        public LoginController(IAuthUserService authUserService, IAuthTokenService authTokenService)
        {
            _authUserService = authUserService;
            _authTokenService = authTokenService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginUser user)
        {
            if (_authUserService.IsAuthUser(user))
            {
                var token = _authTokenService.GenerateToken(user.Username);
                return Ok(new { Token = token });
            }
            return Unauthorized();
        }

    }
}