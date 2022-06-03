import { CSSProperties, useMemo } from 'react';

import { Charset, DisplayModuleColors } from './types';

export function extendCharset<DataType>(
  original: Charset<DataType>,
  additions: Charset<DataType>
): Charset<DataType> {
  return {
    ...original,
    ...additions,
  };
}

export const useColorsVariables = (
  defaultColors: Required<DisplayModuleColors>,
  colors?: DisplayModuleColors
) => {
  return useMemo(() => {
    return {
      '--rdd-active-color': colors?.active || defaultColors.active,
      '--rdd-inactive-color': colors?.inactive || defaultColors.inactive,
      '--rdd-background-color': colors?.background || defaultColors.background,
    } as CSSProperties;
  }, [defaultColors, colors]);
};
