import clsx from 'clsx';

import { DisplayModule, DisplayModuleColors } from '../types';
import { useColorsVariables } from '../utils';
import { Module5x7MatrixCharset } from './consts';

import styles from './module-5x7-matrix.module.scss';

export type Module5x7MatrixDataType = boolean[][];

const defaultColors: Required<DisplayModuleColors> = {
  active: '#111',
  inactive: '#9bb901',
  background: '#9bb901',
};

export const Module5x7Matrix: DisplayModule<Module5x7MatrixDataType> = ({
  char,
  colors,
}) => {
  const style = useColorsVariables(defaultColors, colors);

  return (
    <div className={styles.module} style={style}>
      {[...Array(7)].map((row, rowIndex) =>
        [...Array(5)].map((column, columnIndex) => (
          <div
            className={clsx(
              styles.dot,
              Module5x7Matrix.charset?.[char]?.[rowIndex]?.[columnIndex] &&
                styles.active
            )}
          />
        ))
      )}
    </div>
  );
};
Module5x7Matrix.charset = Module5x7MatrixCharset;
Module5x7Matrix.width = 144;
Module5x7Matrix.height = 196;

export default Module5x7Matrix;
