using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using MongoDB.Driver;

namespace API.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductService(IMongoDatabase db)
        {
            _products = db.GetCollection<Product>("Product");
        }

        public async Task<List<Product>> Get()
        {
            return await _products.Find(p => true).ToListAsync();
        }

        public async Task<Product?> Get(Guid id)
        {
            return await _products.Find(p => p.Id!.Value == id).FirstOrDefaultAsync();
        }

        public async Task<Product> Create(Product product)
        {
            product.Id ??= Guid.NewGuid();
            await _products.InsertOneAsync(product);
            return product;
        }

        public async Task<bool> Update(Guid id, Product product)
        {
            product.Id = id;
            var res = await _products.ReplaceOneAsync(p => p.Id == id, product);
            return res is { IsAcknowledged: true, ModifiedCount: > 0 };
        }

        public async Task<bool> Remove(Guid id)
        {
            var res =await _products.DeleteOneAsync(p => p.Id == id);
            return res is { IsAcknowledged: true, DeletedCount: > 0 };

        }
    }
}