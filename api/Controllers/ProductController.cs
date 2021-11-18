using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Enum;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        public ProductController(ProductService productService)
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

        [HttpGet("category/{category}")]
        public async Task<ActionResult<List<Product>>> Get(CategoryEnum category)
        {
            var product = await _productService.GetByCategory(category);
            return product != null ? Ok(product) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Create(Product product)
        {
            var newProduct = await _productService.Create(product);
            return Created($"/product/{newProduct.Id}", newProduct);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, Product product)
        {
            Console.WriteLine(product.Price);
            return await _productService.Update(id, product) ? NoContent() : NotFound();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return await _productService.Remove(id) ? NoContent() : NotFound();
        }
    }
}