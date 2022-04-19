import { TestBed } from '@angular/core/testing';

import { RoomCalendarService } from './room-calendar.service';

describe('RoomCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomCalendarService = TestBed.get(RoomCalendarService);
    expect(service).toBeTruthy();
  });
});
