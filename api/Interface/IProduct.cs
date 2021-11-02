using System;

namespace api.Interface
{
    public interface IProduct
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public int Price { get; set; }
    }
}