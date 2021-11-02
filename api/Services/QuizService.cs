using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using MongoDB.Driver;

namespace API.Services
{
    public class QuizService
    {
        private readonly IMongoCollection<Quiz> _quizzes;
        public QuizService(IMongoDatabase db)
        {
            _quizzes = db.GetCollection<Quiz>("Quiz");
        }
        public async Task<List<Quiz>> Get()
        {
            return await _quizzes.Find(quiz => true).ToListAsync();
        }

        public async Task<Quiz> Get(Guid id)
        {
            return await _quizzes.Find(quiz => quiz.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Quiz> Create(Quiz quiz)
        {
            quiz.Id = Guid.NewGuid();
            await _quizzes.InsertOneAsync(quiz);
            return quiz;
        }
        public async Task<bool> Update(Guid id, Quiz quizIn)
        {
            var quiz = await _quizzes.Find(quiz => quiz.Id == id).FirstOrDefaultAsync();
            if (quiz == null) return false;
            quizIn.Id = quiz.Id;
            await _quizzes.ReplaceOneAsync(quiz => quiz.Id == id, quizIn);
            return true;
        }
        public async Task<bool> Delete(Guid id)
        {
            var quiz = await _quizzes.Find(quiz => quiz.Id == id).FirstOrDefaultAsync();
            if (quiz == null) return false;
            await _quizzes.DeleteOneAsync(quiz => quiz.Id == id);
            return true;
        }

    }
}