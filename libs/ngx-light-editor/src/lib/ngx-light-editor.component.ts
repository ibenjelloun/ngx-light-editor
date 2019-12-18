import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextStyle, TextBlock, TEXT_BLOCKS } from './model/text-style';
import { defaultOptions, EditorOptions } from './model/editor-options';
import { EditorAction } from './model/editor-action';
import { EditableDirective } from './directives/editable.directive';

@Component({
  selector: 'led-itor',
  templateUrl: './ngx-light-editor.component.html',
  styleUrls: ['./ngx-light-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LightEditorComponent),
      multi: true
    }
  ]
})
export class LightEditorComponent implements ControlValueAccessor {
  @Input() set textStyles(textStyles: TextStyle[]) {
    this._textStyles = textStyles;
    this.classes = textStyles.map(_ => _.class);
    this.defaultTextStyle = textStyles.find(_ => _.default);
    if (!this.defaultTextStyle) {
      throw new Error(
        '[LightEditorComponent] textStyles should contain a default TextStyle having P block'
      );
    }
    this.currentTextStyleLabel = this.defaultTextStyle.label;
  }

  @Input() options: EditorOptions = defaultOptions;
  @Input() actions: EditorAction[] = [];
  @ViewChild(EditableDirective, { static: true }) editableDirective;
  classes = [];
  _textStyles: TextStyle[] = [];
  text = '<p><br></p>';
  onChange;
  onTouched;
  disabled = false;
  currentTextStyleLabel: string;
  defaultTextStyle: TextStyle = <TextStyle>{};
  flags = {};
  styleFlags = {};

  constructor(private elementRef: ElementRef) {
    document.execCommand('defaultParagraphSeparator', false, 'p');
  }
  writeValue(text: string): void {
    if (text) {
      this.text = text;
    }
  }
  handleChange(text: string): void {
    this.onChange(text);
  }
  registerOnChange(fn): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  formatBlock(textStyle: TextStyle) {
    const focusNode = window.getSelection().focusNode;
    if (focusNode && this.elementRef.nativeElement.contains(focusNode)) {
      document.execCommand('formatBlock', false, textStyle.block);
      const element: HTMLElement = this.getFocusNode();
      if (element.tagName === textStyle.block) {
        element.classList.remove(...this.classes);
        if (textStyle.class) {
          element.classList.add(textStyle.class);
        }
        this.editableDirective.callOnChange();
      }
    }
  }
  @HostListener('document:selectionchange')
  getCurrentTextStyle() {
    const focusNode = window.getSelection().focusNode;
    if (focusNode && this.elementRef.nativeElement.contains(focusNode)) {
      const element: HTMLElement = this.getFocusNode();
      const textStyle = this._textStyles.find(t =>
        element.classList.contains(t.class)
      );
      if (textStyle) {
        this.currentTextStyleLabel = textStyle.label;
      } else {
        this.currentTextStyleLabel = this.defaultTextStyle.label;
      }
      this.flags = this.getFormatingStylesFlags();
      this.styleFlags = this.getStylesFlags();
    } else {
      this.currentTextStyleLabel = '';
      this.flags = {};
      this.styleFlags = {};
    }
  }
  editorActionHandler(editorAction: EditorAction) {
    const focusNode = window.getSelection().focusNode;
    if (focusNode && this.elementRef.nativeElement.contains(focusNode)) {
      const value = editorAction.callback(this.text);
      if (value && typeof value === 'string') {
        this.text = value;
        this.handleChange(this.text);
      }
      this.getCurrentTextStyle();
    }
  }
  getFocusNode(): HTMLElement {
    let element: HTMLElement = <HTMLElement>(
      window.getSelection().focusNode.parentNode
    );
    if (element.tagName === 'DIV') {
      element = <HTMLElement>window.getSelection().focusNode;
    } else {
      while (
        !TEXT_BLOCKS.includes(<TextBlock>element.tagName) &&
        element.tagName !== 'DIV'
      ) {
        element = <HTMLElement>element.parentNode;
      }
    }
    return element;
  }
  getFormatingStylesFlags(): any {
    const flags = {};
    let element: HTMLElement = <HTMLElement>(
      window.getSelection().focusNode.parentNode
    );
    if (element.tagName === 'DIV') {
      element = <HTMLElement>window.getSelection().focusNode;
    } else {
      while (
        !TEXT_BLOCKS.includes(<TextBlock>element.tagName) &&
        element.tagName !== 'DIV'
      ) {
        flags[element.tagName] = true;
        element = <HTMLElement>element.parentNode;
      }
    }
    return flags;
  }
  getStylesFlags(): any {
    const element: HTMLElement = this.getFocusNode();
    const flags = {};
    if (element.style) {
      Object.keys(element.style).forEach(key => {
        if (element.style[key]) {
          flags[key] = element.style[key];
        }
      });
    }
    return flags;
  }
  isInsideEditor() {
    const focusNode = window.getSelection().focusNode;
    return focusNode && this.elementRef.nativeElement.contains(focusNode);
  }
}
