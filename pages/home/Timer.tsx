'use client'
import AddIcon from '@mui/icons-material/Add';
import { ReactElement, useEffect, useRef, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import TimeDisplay from './TimeDisplay';
import ButtonRow, { ButtonProps } from './ButtonRow';

///
/// Constants
///

// exported for testing
export const modifierButtonProps = [
  { title: '1s', value: 1, ariaLabel: '1 second' },
  { title: '10s', value: 10, ariaLabel: '10 seconds' },
  { title: '1min', value: 60, ariaLabel: '1 minute' }
];
const maximumTime = 99 * 60 + 59;

///
/// Main Component
///

export default function Timer(): ReactElement {

  const [seconds, setSeconds] = useState<number>(0);
  const millisecondsRef = useRef<number>(0);
  const [intervalID, setIntervalID] = useState<ReturnType<typeof setInterval>>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const addSeconds = (val: number) => {
    let newSeconds = seconds + val;
    if (newSeconds < 0) {
      newSeconds = 0;
    }
    else if (newSeconds > maximumTime) {
      newSeconds = maximumTime;
    }
    setSeconds(newSeconds)
  };

  const buttonRowConfigs: ButtonProps[][] = [
    // add buttons
    modifierButtonProps.map(({ title, value, ariaLabel }) => ({
      title,
      ariaLabel: 'add ' + ariaLabel,
      startIcon: <AddIcon />,
      disabled: hasStarted || seconds === maximumTime,
      handleClick: () => addSeconds(value),
    })),
    // subtract buttons
    modifierButtonProps.map(({ title, value, ariaLabel }) => ({
      title,
      ariaLabel: 'subtract ' + ariaLabel,
      startIcon: <RemoveIcon />,
      disabled: hasStarted || seconds === 0,
      handleClick: () => addSeconds(-value)
    })),
    // control buttons
    [
      {
        title: 'Start',
        disabled: hasStarted || seconds === 0,
        handleClick: () => {
          setHasStarted(true);
          millisecondsRef.current = seconds * 1000;
        }
      },
      {
        title: 'Stop',
        disabled: !hasStarted,
        handleClick: () => {
          setHasStarted(false);
          clearInterval(intervalID);
          console.log('stop')
        }
      },
      {
        title: 'Reset',
        disabled: seconds === 0,
        handleClick: () => setSeconds(0)
      }
    ]
  ];

  useEffect(() => {
    console.log(hasStarted)
    if (!hasStarted) {
      clearInterval(intervalID);
      setIntervalID(undefined);
    }

    if (hasStarted && seconds <= 0) {
      setHasStarted(false);
      setSeconds(0);
      clearInterval(intervalID);
      setIntervalID(undefined);
    }
    else if (hasStarted && !intervalID) {
      setIntervalID(setInterval(() => {
        millisecondsRef.current -= 100;
        if (millisecondsRef.current % 1000 === 0) {
          setSeconds(currentSeconds => currentSeconds - 1)
        }
      }, 100));
    }

  }, [hasStarted, seconds, intervalID]);

  return (
    <>
      <TimeDisplay totalSeconds={seconds} />
      {buttonRowConfigs.map((buttonConfigs, idx) =>
        <ButtonRow key={new Date().getTime() + idx} buttonConfigs={buttonConfigs}/>
      )}
    </>
  )
}
