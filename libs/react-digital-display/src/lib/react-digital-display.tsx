import React, { useMemo } from 'react';

import {
  DisplayModule,
  DisplayModuleColors,
  SpecialChar,
  UnknownCharacterMode,
} from './types';

import styles from './react-digital-display.module.scss';

export interface ReactDigitalDisplayProps {
  text: string | string[];
  module: DisplayModule<unknown>;
  size: number;
  height?: number;
  unknownCharacterMode?: UnknownCharacterMode;
  colors?: DisplayModuleColors;
}

export const ReactDigitalDisplay = ({
  text,
  module: ModuleComponent,
  size,
  height,
  unknownCharacterMode = 'omit',
  colors,
}: ReactDigitalDisplayProps) => {
  const textArray = useMemo(
    () => (typeof text === 'string' ? text.split('') : text),
    [text]
  );

  const dimensions = useMemo(() => {
    const containerHeight = height ?? ModuleComponent.height;
    const scale = containerHeight / ModuleComponent.height;
    const containerWidth = size * ModuleComponent.width * scale;

    return {
      width: containerWidth,
      height: containerHeight,
      scale,
    };
  }, [height, ModuleComponent.width, ModuleComponent.height]);

  const textToDisplay = useMemo(() => {
    const mappedArray = textArray
      .map((char) => {
        const isUnknownChar = !ModuleComponent.charset[char];

        if (isUnknownChar) {
          if (unknownCharacterMode === 'empty') {
            return SpecialChar.EMPTY;
          }
          if (unknownCharacterMode === 'omit') {
            return null;
          }
        }
        return char;
      })
      .reduce<string[]>(
        (arr, char) => [...arr, ...(char !== null ? [char] : [])],
        []
      );

    return Array.from(
      { ...mappedArray, length: size },
      (v) => v ?? SpecialChar.EMPTY
    );
  }, [ModuleComponent.charset, textArray, size, unknownCharacterMode]);

  return (
    <div
      className={styles.displayContainer}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <div
        className={styles.content}
        style={{ transform: `scale(${dimensions.scale})` }}
      >
        {textToDisplay.map((char) => (
          <ModuleComponent char={char} colors={colors} />
        ))}
      </div>
    </div>
  );
};

export default ReactDigitalDisplay;
