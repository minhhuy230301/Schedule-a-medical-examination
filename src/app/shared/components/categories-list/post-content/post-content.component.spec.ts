import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContentComponent } from './post-content.component';

describe('PostContentComponent', () => {
  let component: PostContentComponent;
  let fixture: ComponentFixture<PostContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostContentComponent]
    });
    fixture = TestBed.createComponent(PostContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
