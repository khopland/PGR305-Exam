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
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> Get()
        {
            return await _orderService.Get();
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Order>> Get(Guid id)
        {
            var product = await _orderService.Get(id);
            return product != null ? Ok(product) : NotFound();
        }
        [HttpPost]
        public async Task<ActionResult<Order>> Create(Order order)
        {
            return await _orderService.Create(order);
        }
    }
}