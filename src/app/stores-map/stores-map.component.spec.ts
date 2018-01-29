import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresMapComponent } from './stores-map.component';

describe('StoresMapComponent', () => {
  let component: StoresMapComponent;
  let fixture: ComponentFixture<StoresMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
