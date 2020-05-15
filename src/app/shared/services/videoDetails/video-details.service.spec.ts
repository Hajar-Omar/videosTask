import { TestBed } from '@angular/core/testing';

import { VideoDetailsService } from './video-details.service';

describe('VideoDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoDetailsService = TestBed.get(VideoDetailsService);
    expect(service).toBeTruthy();
  });
});
