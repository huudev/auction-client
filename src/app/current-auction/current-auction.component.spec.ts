import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAuctionComponent } from './current-auction.component';

describe('CurrentAuctionComponent', () => {
  let component: CurrentAuctionComponent;
  let fixture: ComponentFixture<CurrentAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
