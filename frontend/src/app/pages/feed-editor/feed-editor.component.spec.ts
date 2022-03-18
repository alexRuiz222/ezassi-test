import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedEditorComponent } from './feed-editor.component';

describe('FeedEditorComponent', () => {
  let component: FeedEditorComponent;
  let fixture: ComponentFixture<FeedEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
