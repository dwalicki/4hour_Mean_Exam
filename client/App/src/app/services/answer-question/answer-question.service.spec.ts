import { TestBed, inject } from '@angular/core/testing';

import { AnswerQuestionService } from './answer-question.service';

describe('AnswerQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerQuestionService]
    });
  });

  it('should be created', inject([AnswerQuestionService], (service: AnswerQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
