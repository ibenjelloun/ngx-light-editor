import { Component } from '@angular/core';
import {
  boldAction,
  italicAction,
  strikeAction,
  linkAction,
  unlinkAction,
  justifyFullAction,
  justifyCenterAction,
  justifyLeftAction,
  justifyRightAction,
  formatClearAction,
  TextBlock
} from 'ngx-light-editor';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  value = '<p>Hello World</p>';
  value2 = '<p>Hello World with bold action</p>';
  value3 = '<p>Hello World with text style</p>';
  value4 = '<p>Hello World with custom theme</p>';

  actions = [boldAction];
  allActions = [
    boldAction,
    { ...italicAction, label: 'Mettre en italic' },
    strikeAction,
    formatClearAction,
    linkAction,
    unlinkAction,
    justifyLeftAction,
    justifyCenterAction,
    justifyRightAction,
    justifyFullAction
  ];
  customActions = [
    {
      iconPath:
        'https://fonts.gstatic.com/s/i/materialicons/filter_vintage/v1/24px.svg',
      callback: textContent =>
        document.execCommand('insertHtml', false, ' 🌻 '),
      label: 'Add a flower in the cursor point'
    },
    {
      iconPath: 'https://fonts.gstatic.com/s/i/materialicons/star/v1/24px.svg',
      callback: textContent => textContent + ' ⭐ ',
      label: 'Add a star at the end'
    }
  ];

  textStyles = [
    { label: 'Titre', block: TextBlock.H1, class: 'editor-title' },
    { label: 'Titre 2', block: TextBlock.H1, class: 'editor-title-2' },
    { label: 'Sous-titre', block: TextBlock.H2, class: 'editor-sub-title' },
    { label: 'Paragraph', block: TextBlock.P, default: true }
  ];
}
