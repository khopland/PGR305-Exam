using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        public ImageUploadController(IWebHostEnvironment env)
        {
            _env = env;
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> SaveImage(IFormFile file)
        {
            try
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName?.Trim('"') ?? throw new InvalidDataException("filename cant be null");
                var filePath = Path.Combine(_env.WebRootPath, "images", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return Created($"images/{fileName}", new { fileName });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}