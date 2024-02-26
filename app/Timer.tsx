'use client'
import { ReactElement, useEffect, useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import TimeDisplay from './TimeDisplay';
import IconButtonRow, { IconButtonPropsT } from './IconButtonRow';
import ModifierButtonGroup from './ModifierButtonGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

///
/// Constants
///

// exported for testing
export const modifierButtonProps = [
  { title: '1 s', value: 1, ariaLabel: '1 second' },
  { title: '10 s', value: 10, ariaLabel: '10 seconds' },
  { title: '1 min', value: 60, ariaLabel: '1 minute' }
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
  const [toggleFireworks, setToggleFireworks] = useState<boolean>(false);

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

  const buttonRowConfigs: IconButtonPropsT[][] = [
    // control buttons
    [
      {
        ariaLabel: 'Start',
        icon: <PlayArrowIcon fontSize="inherit" />,
        disabled: hasStarted || seconds === 0,
        variant: 'success',
        handleClick: () => {
          setHasStarted(true);
          millisecondsRef.current = seconds * 1000;
        }
      },
      {
        ariaLabel: 'Stop',
        icon: <PauseIcon fontSize="inherit" />,
        disabled: !hasStarted,
        variant: 'warning',
        handleClick: () => {
          setHasStarted(false);
          clearInterval(intervalID);
        }
      },
      {
        ariaLabel: 'Reset',
        icon: <StopIcon fontSize="inherit" />,
        disabled: seconds === 0,
        variant: 'primary',
        handleClick: () => setSeconds(0)
      }
    ]
  ];

  useEffect(() => {
    if (!hasStarted) {
      clearInterval(intervalID);
      setIntervalID(undefined);
    }

    if (hasStarted && seconds <= 0) {
      setHasStarted(false);
      setSeconds(0);
      clearInterval(intervalID);
      setIntervalID(undefined);
      setToggleFireworks(true);
      setTimeout(() => setToggleFireworks(false), 3000);
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

  return (<>
  {/* <Realistic autorun={{ speed: 2 }} /> */}
    {toggleFireworks && <Fireworks autorun={{ speed: 1, duration: 3000 }} />}
    <Card sx={{ margin: 'auto', display: 'flex'}}>
      <Box margin="auto" display="flex" alignItems="center" flexDirection="column" fontSize="large">
        <CardContent sx={{ padding: '1em' }}>
        <Stack divider={<Divider />}>
          <TimeDisplay totalSeconds={seconds} />
          {modifierButtonProps.map(({ title, value, ariaLabel }) =>
            <ModifierButtonGroup
              key={new Date().getTime() + ariaLabel}
              title={ariaLabel}
              value={value}
              setValue={addSeconds}
              disableAddition={hasStarted || seconds === maximumTime}
              disableSubtraction={hasStarted || seconds === 0}
            />
          )}
          {buttonRowConfigs.map((buttonConfigs, idx) =>
            <IconButtonRow key={new Date().getTime() + idx} buttonConfigs={buttonConfigs}/>
          )}
          </Stack>
        </CardContent>
      </Box>
    </Card>
  </>);
}
