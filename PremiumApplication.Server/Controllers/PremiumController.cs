using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PremiumApplication.Server.Controllers
{
    [Route("api/premium")]
    [ApiController]
    public class PremiumController : ControllerBase
    {
        private readonly Dictionary<string, decimal> _factorRating = new()
        {
            { "Cleaner", 11.50m },
            { "Doctor", 1.50m },
            { "Author", 2.25m },
            { "Farmer", 31.75m },
            { "Mechanic", 31.75m },
            { "Florist", 11.50m },
            { "Other", 31.75m }
        };

        [HttpPost("calculate")]
        public IActionResult Calculate([FromBody] PremiumRequest request)
        {
            if(string.IsNullOrWhiteSpace(request.name) 
                || string.IsNullOrWhiteSpace(request.Occupation) 
                || request.AgeNextBirthday < 0 
                || request.DeathSumInsured <= 0)
            {
                return BadRequest("fill all required values in valid format");
            }

            if(!_factorRating.TryGetValue(request.Occupation.Trim(), out decimal factor))
            {
                return BadRequest("Invalid Occupation");
            }

            decimal premium = (request.DeathSumInsured * factor * request.AgeNextBirthday) / 1000 * 12;

            return Ok(new PremiumResponse 
            {
                MonthlyPremium = Math.Round(premium, 2) 
            });
        }
    }
}
