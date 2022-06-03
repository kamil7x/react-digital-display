import { DisplayModule, DisplayModuleColors } from '../types';
import { useColorsVariables } from '../utils';
import { Segment } from './components/segment';
import { Module7SegmentsCharset, SEGMENTS } from './consts';

import styles from './module-7-segments.module.scss';

export type Module7SegmentsDataType = [
  a: boolean,
  b: boolean,
  c: boolean,
  d: boolean,
  e: boolean,
  f: boolean,
  g: boolean
];

const defaultColors: Required<DisplayModuleColors> = {
  active: '#000',
  inactive: '#eee',
  background: 'transparent',
};

export const Module7Segments: DisplayModule<Module7SegmentsDataType> = ({
  char,
  colors,
}) => {
  const style = useColorsVariables(defaultColors, colors);

  return (
    <div className={styles.module} style={style}>
      <div className={styles.inner}>
        {SEGMENTS.map((segment, index) => (
          <Segment
            key={segment.key}
            type={segment.type}
            isActive={Module7Segments.charset[char][index]}
            className={styles[`segment-${segment.key}`]}
          />
        ))}
      </div>
    </div>
  );
};
Module7Segments.charset = Module7SegmentsCharset;
Module7Segments.width = 164;
Module7Segments.height = 264;

export default Module7Segments;
