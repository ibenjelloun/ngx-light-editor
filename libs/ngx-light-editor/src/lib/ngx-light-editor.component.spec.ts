import { TestBed, async } from '@angular/core/testing';
import { LightEditorComponent } from './ngx-light-editor.component';

describe('NgxLightEditor', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LightEditorComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LightEditorComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
