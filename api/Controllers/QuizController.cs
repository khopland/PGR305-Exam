using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly QuizService _quizService;

        public QuizController(QuizService QuizService)
        {
            _quizService = QuizService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Quiz>>> Get()
        {
            return await _quizService.Get();
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Quiz>> Get(Guid id)
        {
            var quiz = await _quizService.Get(id);
            return quiz != null ? Ok(quiz) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Quiz>> Create(Quiz quiz)
        {
            var data = await _quizService.Create(quiz);
            return Created($"/api/quiz/{data.Id}", data);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, Quiz quiz)
        {
            return await _quizService.Update(id, quiz) ? NoContent() : NotFound();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return await _quizService.Delete(id) ? NoContent() : NotFound();
        }
    }
}