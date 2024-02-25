'use client'
import { ReactElement, useEffect, useState } from 'react';
import TimeDisplay from './TimeDisplay';
import ButtonRow, { ButtonProps } from './ButtonRow';

///
/// Constants
///

const buttonValuesInSeconds = [
  { title: '1s', value: 1 },
  { title: '10s', value: 10 },
  { title: '1min', value: 60 }
];
const maximumTime = 99 * 60 + 59;

///
/// Main Component
///

function Timer(): ReactElement {

  const [seconds, setSeconds] = useState<number>(0);
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
    buttonValuesInSeconds.map(({ title, value }) => ({
      title: '+ ' + title,
      disabled: hasStarted || seconds === maximumTime,
      onClick: () => addSeconds(value)
    })),
    // subtract buttons
    buttonValuesInSeconds.map(({ title, value }) => ({
      title: '- ' + title,
      disabled: hasStarted || seconds - value < 0,
      onClick: () => addSeconds(-value)
    })),
    // control buttons
    [
      {
        title: 'Start',
        disabled: hasStarted || seconds === 0,
        onClick: () => setHasStarted(true)
      },
      {
        title: 'Stop',
        disabled: !hasStarted,
        onClick: () => setHasStarted(false)
      },
      {
        title: 'Reset',
        disabled: seconds === 0,
        onClick: () => setSeconds(0)
      }
    ]
  ];

  useEffect(() => {

    if (hasStarted && seconds <= 0) {
      setHasStarted(false);
      setSeconds(0);
      clearInterval(intervalID);
      setIntervalID(undefined);
    }
    else if (hasStarted && !intervalID) {
      setIntervalID(setInterval(() => setSeconds(currentSeconds => currentSeconds - 0.1), 100));
    }
    else if (!hasStarted) {
      clearInterval(intervalID);
      setIntervalID(undefined);
    }

  }, [hasStarted, seconds, intervalID]);

  return (
    <div>
      <TimeDisplay totalSeconds={seconds} />
      {buttonRowConfigs.map(buttonConfigs => <ButtonRow buttonConfigs={buttonConfigs}/>)}
    </div>
  )
}

export default Timer;
