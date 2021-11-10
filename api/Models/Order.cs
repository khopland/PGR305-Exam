using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class Order
    {
        [BsonId]
        public Guid? Id { get; set; }
        public List<OrderItem>? Orders { get; set; }
    }
}