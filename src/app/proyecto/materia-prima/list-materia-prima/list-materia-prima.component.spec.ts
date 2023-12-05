import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMateriaPrimaComponent } from './list-materia-prima.component';

describe('ListMateriaPrimaComponent', () => {
  let component: ListMateriaPrimaComponent;
  let fixture: ComponentFixture<ListMateriaPrimaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMateriaPrimaComponent]
    });
    fixture = TestBed.createComponent(ListMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
