using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Enum;
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
            return await _products.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Product>> GetByCategory(CategoryEnum category)
        {
            return await _products.Find(p => p.Category == category).ToListAsync();
        }

        public async Task<Product> Create(Product product)
        {
            product.Id = Guid.NewGuid();
            await _products.InsertOneAsync(product);
            return product;
        }

        public async Task<bool> Update(Guid id, Product product)
        {
            var p = await _products.Find(quiz => quiz.Id == id).FirstOrDefaultAsync();
            if (p == null) return false;
            product.Id = id;
            if (product.Image == null) product.Image = p.Image;
            if (product.Description == null) product.Description = p.Description;
            product.Reviews = p.Reviews ?? new List<Review>();
            var res = await _products.ReplaceOneAsync(p => p.Id == id, product);
            return res is { IsAcknowledged: true, ModifiedCount: > 0 };
        }

        public async Task<bool> Remove(Guid id)
        {
            var p = await _products.Find(quiz => quiz.Id == id).FirstOrDefaultAsync();
            if (p == null) return false;
            var res = await _products.DeleteOneAsync(p => p.Id == id);
            return res is { IsAcknowledged: true, DeletedCount: > 0 };
        }

        public async Task<bool> CreateReview(Guid id, Review review)
        {
            var res = await _products.UpdateOneAsync(x => x.Id == id,
                Builders<Product>.Update.Push(x => x.Reviews, review));
            return res.IsAcknowledged;
        }
    }
}