using System;
using API.Enum;

namespace api.Interface
{
    public interface IProduct
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public int Price { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public CategoryEnum Category { get; set; }
    }
}