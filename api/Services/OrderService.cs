using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using MongoDB.Driver;

namespace API.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderService(IMongoDatabase db)
        {
            _orders = db.GetCollection<Order>("Order");
        }
        public async Task<List<Order>> Get()
        {
            return await _orders.Find(p => true).ToListAsync();
        }
        public async Task<Order?> Get(Guid id)
        {
            return await _orders.Find(o => o.Id == id).FirstOrDefaultAsync();
        }
        public async Task<Order> Create(Order order)
        {
            order.Id = Guid.NewGuid();
            order.Date = DateTime.UtcNow;
            await _orders.InsertOneAsync(order);
            return order;
        }
    }
}