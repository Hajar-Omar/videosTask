import { TestBed } from '@angular/core/testing';

import { MyVideosService } from './my-videos.service';

describe('MyVideosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyVideosService = TestBed.get(MyVideosService);
    expect(service).toBeTruthy();
  });
});
