import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRegistrationComponent } from './post-registration.component';

describe('PostRegistrationComponent', () => {
  let component: PostRegistrationComponent;
  let fixture: ComponentFixture<PostRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
