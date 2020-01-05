import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonimFinderComponent } from './synonim-finder.component';

describe('SynonimFinderComponent', () => {
  let component: SynonimFinderComponent;
  let fixture: ComponentFixture<SynonimFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynonimFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonimFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
