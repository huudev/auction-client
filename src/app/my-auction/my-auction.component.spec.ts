import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAuctionComponent } from './my-auction.component';

describe('MyAuctionComponent', () => {
  let component: MyAuctionComponent;
  let fixture: ComponentFixture<MyAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
