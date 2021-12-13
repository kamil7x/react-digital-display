import { DisplayModule } from '../types';
import { Segment } from './components/segment';
import { Module7SegmentCharset, SEGMENTS } from './consts';

import styles from './module-7-segments.module.scss';

export type Module7SegmentDataType = [
  a: boolean,
  b: boolean,
  c: boolean,
  d: boolean,
  e: boolean,
  f: boolean,
  g: boolean
];

export const Module7Segments: DisplayModule<Module7SegmentDataType> = ({
  char,
}) => {
  return (
    <div className={styles.module}>
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
Module7Segments.charset = Module7SegmentCharset;
Module7Segments.width = 164;
Module7Segments.height = 264;

export default Module7Segments;
