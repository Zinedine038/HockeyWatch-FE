import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCasterDashboardComponent } from './match-caster-dashboard.component';

describe('MatchCasterDashboardComponent', () => {
  let component: MatchCasterDashboardComponent;
  let fixture: ComponentFixture<MatchCasterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchCasterDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchCasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
