import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRendererComponent } from './base-renderer.component';

describe('BaseRendererComponent', () => {
  let component: BaseRendererComponent;
  let fixture: ComponentFixture<BaseRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
