// Importing part
import * as Icons from 'iconsax-react';
import { IconsaxIconsPropsType } from '@/types/SvgProp';

// Creating and exporting IconsaxIcons component as deafult
export default function IconsaxIcons({
  name,
  size = 24,
  color = 'black',
  variant = 'Linear',
  ...props
}: IconsaxIconsPropsType) {
  // Getting dynamic icon
  const IconComponent = (Icons as any)[name];

  // Returning JSX
  return (
    <IconComponent size={size} color={color} variant={variant} {...props} />
  );
}
