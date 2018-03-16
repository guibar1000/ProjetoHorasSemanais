import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesfuncionariosComponent } from './detalhesfuncionarios.component';

describe('DetalhesfuncionariosComponent', () => {
  let component: DetalhesfuncionariosComponent;
  let fixture: ComponentFixture<DetalhesfuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesfuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesfuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
