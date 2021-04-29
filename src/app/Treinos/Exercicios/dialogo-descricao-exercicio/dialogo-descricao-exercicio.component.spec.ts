import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoDescricaoExercicioComponent } from './dialogo-descricao-exercicio.component';

describe('DialogoDescricaoExercicioComponent', () => {
  let component: DialogoDescricaoExercicioComponent;
  let fixture: ComponentFixture<DialogoDescricaoExercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoDescricaoExercicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoDescricaoExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
