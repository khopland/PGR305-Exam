using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MongoController : ControllerBase
    {
        private readonly ProductService _productService;

        public MongoController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get()
        {
            return await _productService.Get();
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Product>> Get(Guid id)
        {
            var product = await _productService.Get(id);
            return product != null ? Ok(product) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Create(Product product)
        {
            return await _productService.Create(product);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, Product product)
        {
            var p = await _productService.Get(id);
            if (p == null) return NotFound();
            return await _productService.Update(id, product) ? NoContent() : NotFound();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var p = await _productService.Get(id);
            if (p == null) return NotFound();
            return await _productService.Remove(id) ? NoContent() : NotFound();
        }
    }
}