import React from 'react';
import {theme} from '../config/theme';

export const Keyword: React.FC<React.PropsWithChildren<{color?: string}>> = ({children, color = theme.colors.blue}) => (
  <span style={{color, fontWeight: 900}}>{children}</span>
);
