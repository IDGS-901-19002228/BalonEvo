import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRecetasComponent } from './mostrar-recetas.component';

describe('MostrarRecetasComponent', () => {
  let component: MostrarRecetasComponent;
  let fixture: ComponentFixture<MostrarRecetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarRecetasComponent]
    });
    fixture = TestBed.createComponent(MostrarRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
