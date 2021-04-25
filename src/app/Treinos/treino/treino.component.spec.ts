import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreinoComponent } from './treino.component';

describe('TreinoComponent', () => {
  let component: TreinoComponent;
  let fixture: ComponentFixture<TreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
