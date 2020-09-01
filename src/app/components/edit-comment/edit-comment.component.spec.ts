import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentComponent } from './edit-comment.component';
import { AppModule } from 'src/app/app.module';

describe('EditCommentComponent', () => {
  let component: EditCommentComponent;
  let fixture: ComponentFixture<EditCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCommentComponent],
      imports: [AppModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
