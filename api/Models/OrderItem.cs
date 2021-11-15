
namespace API.Models
{
    public class OrderItem
    {
        public Product? Product { get; set; }
        public int Amount { get; set; }
        public string? Size { get; set; }
    }
}