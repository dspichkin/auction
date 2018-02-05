import { TestBed, async, fakeAsync, inject } from '@angular/core/testing';
import { StarsComponent } from './stars';

describe('StarsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarsComponent]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  it('is successfully injected', () => {
    const component = TestBed.createComponent(StarsComponent).componentInstance;

    expect(component instanceof StarsComponent).toEqual(true);
  });

  it('readonly property is true by default', () => {
    const component = TestBed.createComponent(StarsComponent).componentInstance;

    expect(component.readonly).toEqual(true);
  });

  it('all stars are empty', () => {
    const fixture = TestBed.createComponent(StarsComponent);
    const element = fixture.nativeElement;
    const cmp = fixture.componentInstance;

    cmp.rating = 0;
    fixture.detectChanges();

    const selector = '.material-icons';
    expect(element.querySelectorAll('.material-icons').length).toBe(5);
  });

  it('emits rating change event when readonly is false', async(() => {
    const component = TestBed.createComponent(StarsComponent).componentInstance;
    component.ratingChange.subscribe(r => {
      expect(r).toBe(3);
    });
    component.readonly = false;
    component.fillStarsWithColor(2);
    
  }));


});
