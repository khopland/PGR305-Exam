using System;

namespace API.Models
{
    public class Review
    {
        public string? name { get; set; }
        public string? review { get; set; }
        public int rating { get; set; }
        public DateTime date { get; set; }
    }
}