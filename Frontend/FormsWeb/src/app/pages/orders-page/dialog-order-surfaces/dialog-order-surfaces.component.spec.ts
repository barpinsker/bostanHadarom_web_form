import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderSurfacesComponent } from './dialog-order-surfaces.component';

describe('DialogOrderSurfacesComponent', () => {
  let component: DialogOrderSurfacesComponent;
  let fixture: ComponentFixture<DialogOrderSurfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOrderSurfacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogOrderSurfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
