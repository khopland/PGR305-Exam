using System;
using System.Collections.Generic;
using api.Interface;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class Quiz : IQuiz
    {
        public Quiz()
        {
            Answers = new List<string>();
        }
        [BsonId] 
        public Guid? Id { get; set; }
        public string? Question { get; set; }
        public IEnumerable<String> Answers  { get; set; }
        public int CorrectAnswer { get; set; }
    }
}