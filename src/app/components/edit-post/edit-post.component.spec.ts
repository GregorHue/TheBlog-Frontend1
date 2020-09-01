import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostComponent } from './edit-post.component';
import { AppModule } from 'src/app/app.module';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPostComponent],
      imports: [AppModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
