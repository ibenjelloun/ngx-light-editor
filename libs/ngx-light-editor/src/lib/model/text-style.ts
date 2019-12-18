export interface TextStyle {
  label: string;
  block: string;
  class?: string;
  default?: boolean;
}

export enum TextBlock {
  H1 = "H1",
  H2 = "H2",
  H3 = "H2",
  H4 = "H4",
  H5 = "H5",
  H6 = "H6",
  P = "P"
}

export const TEXT_BLOCKS = [
  TextBlock.H1,
  TextBlock.H2,
  TextBlock.H3,
  TextBlock.H4,
  TextBlock.H5,
  TextBlock.H6,
  TextBlock.P
];
