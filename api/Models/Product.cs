using System;
using api.Interface;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Enum
{
    public class Product : IProduct
    {
        [BsonId]
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public int Price { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public CategoryEnum Category { get; set; }
    }
}