import { async, TestBed } from '@angular/core/testing';
import { NgxLightEditorModule } from './ngx-light-editor.module';

describe('NgxLightEditorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxLightEditorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxLightEditorModule).toBeDefined();
  });
});
