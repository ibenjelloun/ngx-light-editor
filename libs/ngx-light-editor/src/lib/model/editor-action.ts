export interface EditorAction {
  iconPath: string;
  callback: (string) => string | boolean | void;
  label: string;
  block?: string;
  style?: { key: string; value: string };
}
