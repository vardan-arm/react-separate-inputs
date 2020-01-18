import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import { LAYOUT_DIRECTION_ENUM } from '../constants/layout.constants';
import { replaceAt } from '../utils/string-helpers';
import SessionIdSingleInputComponent, {
  OnChangeParamsInterface,
} from './sessionid-single-input.component';

export const PlaceholderString = ' ';

const useStyles = makeStyles({
  sessionIdContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

interface PropsInterface {
  inputLength?: number;
  onChange: (sessionId: string) => unknown;
  layoutDirection?: string;
}

interface GetInputIndexToFocusParamsInterface {
  inputIndex: number;
  inputLength: number;
  key: string | undefined;
  keepFocus: boolean | undefined;
  layoutDirection: string;
}

type GetInputIndexToFocusType = (
  params: GetInputIndexToFocusParamsInterface,
) => number | null;

const getInputIndexToFocus: GetInputIndexToFocusType = ({
  inputIndex,
  inputLength,
  key,
  keepFocus,
  layoutDirection,
}: GetInputIndexToFocusParamsInterface) => {
  let inputIndexToFocus: number | null = null;

  switch (key) {
    case 'Backspace': {
      if (keepFocus) {
        inputIndexToFocus = inputIndex;
      } else {
        inputIndexToFocus = inputIndex > 0 ? inputIndex - 1 : 0;
      }
      break;
    }
    case 'Delete': {
      inputIndexToFocus = inputIndex;
      break;
    }
    case 'ArrowRight': {
      if (layoutDirection === LAYOUT_DIRECTION_ENUM.ltr) {
        inputIndexToFocus =
          inputIndex < inputLength - 1 ? inputIndex + 1 : inputIndex;
      } else {
        inputIndexToFocus = inputIndex > 0 ? inputIndex - 1 : 0;
      }
      break;
    }
    case 'ArrowLeft': {
      if (layoutDirection === LAYOUT_DIRECTION_ENUM.ltr) {
        inputIndexToFocus = inputIndex > 0 ? inputIndex - 1 : 0;
      } else {
        inputIndexToFocus =
          inputIndex < inputLength - 1 ? inputIndex + 1 : inputIndex;
      }
      break;
    }
    default: {
      // normal flow, a number is typed - move to next input
      inputIndexToFocus = inputIndex < inputLength - 1 ? inputIndex + 1 : null;
      break;
    }
  }

  return inputIndexToFocus;
};

const SessionIdContainerComponent: React.FC<PropsInterface> = ({
  inputLength = 4,
  onChange,
  layoutDirection = LAYOUT_DIRECTION_ENUM.ltr,
}: PropsInterface) => {
  const classes = useStyles();

  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(
    null,
  );

  const sessionIdInitialValue = PlaceholderString.repeat(inputLength);
  const [sessionId, setSessionId] = useState<string>(sessionIdInitialValue);

  interface HandleChangeParamsInterface extends OnChangeParamsInterface {
    inputIndex: number;
  }

  const handleChange = ({
    inputIndex,
    newValue,
    key,
    keepFocus,
  }: HandleChangeParamsInterface): void => {
    const newSessionId = replaceAt(sessionId, inputIndex, newValue);
    setSessionId(newSessionId);

    const inputIndexToFocus = getInputIndexToFocus({
      inputIndex,
      inputLength,
      key,
      keepFocus,
      layoutDirection,
    });
    setFocusedInputIndex(inputIndexToFocus);

    // Call `onChange` from parent component
    onChange(newSessionId);
  };

  return (
    <>
      <div className={classes.sessionIdContainer} dir={layoutDirection}>
        {[...new Array(inputLength)].map((_, index) => {
          return (
            <SessionIdSingleInputComponent
              key={index}
              value={sessionId[index]}
              isFocused={focusedInputIndex === index}
              onChange={(args: OnChangeParamsInterface) => {
                handleChange({ inputIndex: index, ...args });
              }}
              layoutDirection={layoutDirection}
            />
          );
        })}
      </div>
    </>
  );
};

export default SessionIdContainerComponent;
