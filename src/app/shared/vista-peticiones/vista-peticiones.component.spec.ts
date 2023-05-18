import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPeticionesComponent } from './vista-peticiones.component';

describe('VistaPeticionesComponent', () => {
  let component: VistaPeticionesComponent;
  let fixture: ComponentFixture<VistaPeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPeticionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
