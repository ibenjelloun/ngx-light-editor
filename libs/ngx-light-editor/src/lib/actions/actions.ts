import { EditorAction } from '../model/editor-action';

export const boldAction: EditorAction = {
  iconPath:
    'https://fonts.gstatic.com/s/i/materialicons/format_bold/v1/24px.svg',
  callback: () => document.execCommand('bold', false, ''),
  label: 'Bold',
  block: 'B'
};

export const italicAction: EditorAction = {
  iconPath:
    'https://fonts.gstatic.com/s/i/materialicons/format_italic/v1/24px.svg',
  callback: () => document.execCommand('italic', false, ''),
  label: 'Italic',
  block: 'I'
};

export const strikeAction: EditorAction = {
  iconPath:
    'https://fonts.gstatic.com/s/i/materialicons/strikethrough_s/v1/24px.svg',
  callback: () => document.execCommand('strikeThrough', false, ''),
  label: 'Strike',
  block: 'STRIKE'
};

export const linkAction: EditorAction = {
  iconPath: 'https://fonts.gstatic.com/s/i/materialicons/link/v1/24px.svg',
  callback: () => {
    if (!document.getSelection().isCollapsed) {
      const url = prompt('Link');
      if (url) {
        document.execCommand('createLink', true, url);
      }
    }
  },
  label: 'Create link',
  block: 'A'
};

export const unlinkAction: EditorAction = {
  iconPath: 'https://fonts.gstatic.com/s/i/materialicons/link_off/v1/24px.svg',
  callback: () => document.execCommand('unlink', false, ''),
  label: 'Unlink'
};

export const justifyCenterAction: EditorAction = {
  iconPath:
    'https://fonts.gstatic.com/s/i/materialicons/format_align_center/v1/24px.svg',
  callback: () => document.execCommand('justifyCenter', false, ''),
  label: 'Justify center',
  style: { key: 'textAlign', value: 'center' }
};

export const justifyFullAction: EditorAction = {
  iconPath:
    'https://fonts.gstatic.com/s/i/materialicons/format_align_justify/v1/24px.svg',
  callback: () => document.execCommand('justifyFull', false, ''),
  label: 'Justify full',
  style: { key: 'textAlign', value: 'justify' }
};

export const justifyLeftAction: EditorAction = {
  iconPath:
    'https://fonts.gstatic.com/s/i/materialicons/format_align_left/v1/24px.svg',
  callback: () => document.execCommand('justifyLeft', false, ''),
  label: 'Justify left',
  style: { key: 'textAlign', value: 'left' }
};

export const justifyRightAction: EditorAction = {
  iconPath:
    'https://fonts.gstatic.com/s/i/materialicons/format_align_right/v1/24px.svg',
  callback: () => document.execCommand('justifyRight', false, ''),
  label: 'Justify right',
  style: { key: 'textAlign', value: 'right' }
};

export const formatClearAction: EditorAction = {
  iconPath:
    'https://fonts.gstatic.com/s/i/materialicons/format_clear/v1/24px.svg',
  callback: () => document.execCommand('removeFormat', false, ''),
  label: 'Format clear'
};
