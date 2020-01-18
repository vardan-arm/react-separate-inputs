import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';

import { LAYOUT_DIRECTION_ENUM } from '../constants/layout.constants';
import { isInputNumber } from '../utils/string-helpers';
import { PlaceholderString } from './session-id-container.component';

const useStyles = makeStyles({
  inputContainer: {
    margin: 'auto 4px',
  },
  inputField: {
    height: '56px',
    width: '40px',
    border: '1px solid #B3B3A6',
    borderRadius: '3px',
    textAlign: 'center',
    fontSize: '36px',
    lineHeight: '30px',

    '&:focus': {
      outline: 'none',
    },
  },
});

export interface OnChangeParamsInterface {
  newValue: string;
  key?: string;
  keepFocus?: boolean;
}

interface PropsInterface {
  value: string;
  onChange: (params: OnChangeParamsInterface) => void;
  isFocused: boolean;
  layoutDirection: string;
}

const SessionIdSingleInputComponent: React.FC<PropsInterface> = ({
  value,
  onChange,
  isFocused,
  layoutDirection,
}: PropsInterface) => {
  const classes = useStyles();

  const { ltr, rtl } = LAYOUT_DIRECTION_ENUM;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      (inputRef.current as HTMLInputElement).focus();
    } else {
      (inputRef.current as HTMLInputElement).blur();
    }
  }, [isFocused]);

  const isNavigationNeeded = (e: KeyboardEvent): boolean => {
    // Using "Record" type here, as TypeScript complains that "Property 'selectionStart' does not exist on type 'KeyboardEvent'."
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target = e.target as Record<string, any>;
    return (
      (e.key === 'ArrowLeft' &&
        ((layoutDirection === ltr && target.selectionStart === 0) ||
          (layoutDirection === rtl && target.selectionStart === 1))) ||
      (e.key === 'ArrowRight' &&
        ((layoutDirection === ltr && target.selectionStart === 1) ||
          (layoutDirection === rtl && target.selectionStart === 0)))
    );
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    const { key } = e;

    if (isInputNumber(key)) {
      onChange({
        newValue: key,
      });
    } else if (key === 'Delete') {
      // "Delete" is clicked - if there is a value, remove it
      onChange({ newValue: PlaceholderString, key });
    } else if (key === 'Backspace') {
      if (value === PlaceholderString) {
        onChange({ newValue: PlaceholderString, key });
      } else {
        onChange({ newValue: PlaceholderString, key, keepFocus: true });
      }
    } else if (isNavigationNeeded(e)) {
      onChange({ newValue: value, key });
    }
  };

  return (
    <div className={classes.inputContainer}>
      <input
        className={classes.inputField}
        ref={inputRef}
        value={value}
        maxLength={1}
        onChange={e => e}
        onKeyDown={e => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleKeyDown(e as any);
        }}
      />
    </div>
  );
};

export default SessionIdSingleInputComponent;
