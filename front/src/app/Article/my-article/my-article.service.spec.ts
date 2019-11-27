import { TestBed } from '@angular/core/testing';

import { MyArticleService } from './my-article.service';

describe('MyArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyArticleService = TestBed.get(MyArticleService);
    expect(service).toBeTruthy();
  });
});
