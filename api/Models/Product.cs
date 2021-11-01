using System;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class Product
    {
        [BsonId] 
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
    }
}