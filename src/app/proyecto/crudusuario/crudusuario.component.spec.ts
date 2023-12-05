import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDusuarioComponent } from './crudusuario.component';

describe('CRUDusuarioComponent', () => {
  let component: CRUDusuarioComponent;
  let fixture: ComponentFixture<CRUDusuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CRUDusuarioComponent]
    });
    fixture = TestBed.createComponent(CRUDusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
