using System;
using System.Collections.Generic;

namespace api.Interface
{
    public interface IQuiz
    {
        public Guid? Id { get; set; }
        public string? Question { get; set; }
        public IEnumerable<String> Answers { get; set; }
        public int CorrectAnswer { get; set; }
    }
}