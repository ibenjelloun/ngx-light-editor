import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import DOMPurify from 'dompurify';

@Directive({
  selector: '[ledItable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableDirective),
      multi: true
    }
  ]
})
export class EditableDirective implements ControlValueAccessor {
  @Output() ledFocus = new EventEmitter<void>();
  @Output() ledRemove = new EventEmitter<void>();
  @Input() set ledItable(value: boolean) {
    if (typeof value === 'boolean') {
      this.elementRef.nativeElement.contentEditable = value;
    }
  }
  @Input() parent;
  @Input() customizable = false;
  @Input() typeActionsTemplate;
  private onChange: (value: string) => void;
  private onTouched: () => void;
  private removeDisabledState: () => void;
  private emptyContent = false;

  private get text() {
    return this.elementRef.nativeElement['textContent'];
  }

  private get html() {
    return this.elementRef.nativeElement['innerHTML'];
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('input')
  public callOnChange() {
    if (typeof this.onChange === 'function') {
      if (!this.html.includes('<') && this.text) {
        const htmlContent = '<p>' + this.html + '</p>';
        this.onChange(htmlContent);
        this.elementRef.nativeElement['innerHTML'] = htmlContent;
        this.setEndOfContenteditable(this.elementRef.nativeElement);
      } else {
        this.onChange(this.html);
      }
    }
    this.ledFocus.emit();
  }

  @HostListener('keydown', ['$event'])
  callOnBackSpace(event: KeyboardEvent) {
    if (event.code === 'Backspace' && this.text === '') {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  callOnPast(e) {
    e.preventDefault();
    const plainText = (e.originalEvent || e).clipboardData.getData(
      'text/plain'
    );
    document.execCommand('insertText', false, plainText);
  }

  @HostListener('drop', ['$event'])
  callOnDrop(e) {
    e.preventDefault();
  }

  @HostListener('keyup', ['$event'])
  backspaceClick(e) {
    if (this.customizable && this.emptyContent && e.code === 'Backspace') {
      this.ledRemove.emit();
    }
    this.emptyContent = this.text === '';
  }

  writeValue(value: string): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      DOMPurify.sanitize(value)
    );
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'disabled',
        'true'
      );
      this.removeDisabledState = this.renderer.listen(
        this.elementRef.nativeElement,
        'keydown',
        this.listenerDisabledState
      );
    } else {
      if (this.removeDisabledState) {
        this.renderer.removeAttribute(
          this.elementRef.nativeElement,
          'disabled'
        );
        this.removeDisabledState();
      }
    }
  }

  private listenerDisabledState(e: KeyboardEvent) {
    e.preventDefault();
  }

  setEndOfContenteditable(contentEditableElement) {
    let range, selection;
    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(contentEditableElement);
      range.collapse(false);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
