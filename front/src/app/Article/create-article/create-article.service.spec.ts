import { TestBed } from '@angular/core/testing';

import { CreateArticleService } from './create-article.service';

describe('CreateArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateArticleService = TestBed.get(CreateArticleService);
    expect(service).toBeTruthy();
  });
});
