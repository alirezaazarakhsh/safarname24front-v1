// Importing part
import * as Icons from 'iconsax-react';
import { HTMLAttributes } from 'react';

// Creating and exporting types of SVG Icons
export type SvgProps = React.HTMLAttributes<SVGElement> & {
  fill?: string;
};

export type IconsName = keyof typeof Icons;

export interface IconsaxIconsPropsType extends HTMLAttributes<SVGElement> {
  name: IconsName;
  size?: number;
  color?: string;
  variant?: 'Linear' | 'Bold' | 'Outline' | 'TwoTone' | 'Broken';
}
