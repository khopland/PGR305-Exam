using System;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly ProductService _productService;

        public ReviewController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("{id:guid}")]
        public async Task<ActionResult<Review>> CreateReview(Guid id, Review review)
        {
            var product = await _productService.Get(id);
            if (product is null) return NotFound();

            var res = await _productService.CreateReview(id, review);
            return res ? Created($"/product/{product.Id}", review): BadRequest();
        }
    }
}