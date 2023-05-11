import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiSnackbarComponent } from './mi-snackbar.component';

describe('MiSnackbarComponent', () => {
  let component: MiSnackbarComponent;
  let fixture: ComponentFixture<MiSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
