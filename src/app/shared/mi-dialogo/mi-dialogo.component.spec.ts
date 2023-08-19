import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiDialogoComponent } from './mi-dialogo.component';

describe('MiDialogoComponent', () => {
  let component: MiDialogoComponent;
  let fixture: ComponentFixture<MiDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiDialogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
