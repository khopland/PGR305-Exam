﻿using System;
using System.Collections.Generic;
using API.Enum;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class Product
    {
        [BsonId]
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public int Price { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public CategoryEnum Category { get; set; }
        public List<Review> Reviews { get; set; } = new List<Review>();
        public List<string>? sizes { get; set; }
    }
}