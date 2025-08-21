using backend.Model;
using backend.Service.AuthService.AuthTokenService;
using backend.Service.AuthService.AuthUserService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller.Auth
{
    [ApiController]
    [Route("api/signin")]
    public class SignInController : ControllerBase
    {
        private readonly IAuthUserService _authUserService;
        private readonly IAuthTokenService _authTokenService;

        public SignInController(IAuthUserService authUserService, IAuthTokenService authTokenService)
        {
            _authUserService = authUserService;
            _authTokenService = authTokenService;
        }

        [HttpPost]
        public IActionResult SignIn([FromBody] SignInUser user)
        {
            try
            {
                _authUserService.AddUser(user);
                var token = _authTokenService.GenerateToken(user.Username);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}