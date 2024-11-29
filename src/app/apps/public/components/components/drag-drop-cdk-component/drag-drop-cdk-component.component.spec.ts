import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropCdkComponentComponent } from './drag-drop-cdk-component.component';

describe('DragDropCdkComponentComponent', () => {
  let component: DragDropCdkComponentComponent;
  let fixture: ComponentFixture<DragDropCdkComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropCdkComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropCdkComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
