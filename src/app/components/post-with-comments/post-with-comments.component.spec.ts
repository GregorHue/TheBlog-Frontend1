import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWithCommentsComponent } from './post-with-comments.component';
import { AppModule } from 'src/app/app.module';

describe('PostWithCommentsComponent', () => {
  let component: PostWithCommentsComponent;
  let fixture: ComponentFixture<PostWithCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostWithCommentsComponent],
      imports: [AppModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostWithCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
