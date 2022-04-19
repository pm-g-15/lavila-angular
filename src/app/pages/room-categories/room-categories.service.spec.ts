import { TestBed } from '@angular/core/testing';

import { RoomCategoriesService } from './room-categories.service';

describe('RoomCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomCategoriesService = TestBed.get(RoomCategoriesService);
    expect(service).toBeTruthy();
  });
});
