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
import { maximumTime, modifierButtonProps } from './constants';

///
/// Main Component
///

/**
 * Represents a timer with a keypad for controlling the time and the timer's state. Makes confetti fireworks when countdown reaches zero without reset :)
 * Timer states:
 * - reset: Time is at 00 : 00 and all control and subtract buttons are disabled. Rendered in this state by default.
 * - active: Time is non-zero and is counting down in 100ms increments, but re-renders every 1s. Only stop and reset buttons are enabled.
 * - stopped: Time is non-zero and is not counting down. All add and subtract buttons are enabled. Play and reset buttons are enabled.
 */
export default function Timer(): ReactElement {

  const [seconds, setSeconds] = useState<number>(0);
  // milliseconds tracked using a reference to prevent unnecessary re-renders every 100 milliseconds
  const millisecondsRef = useRef<number>(0);
  const [intervalID, setIntervalID] = useState<ReturnType<typeof setInterval>>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [toggleFireworks, setToggleFireworks] = useState<boolean>(false);

  /**
   * Helper function that adds or subtracts seconds.
   * Prevents number of seconds to go below 0 and above the maximum time allowed
   */
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

  /**
   * Sets props, icons, and callbacks for the Play, Stop, and Reset buttons.
   */
  const controllerButtonsProps: IconButtonPropsT[][] = [
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
        }
      },
      {
        ariaLabel: 'Reset',
        icon: <StopIcon fontSize="inherit" />,
        disabled: seconds === 0,
        variant: 'primary',
        handleClick: () => {
          setSeconds(0);
          setHasStarted(false);
        }
      }
    ]
  ];

  useEffect(() => {
    // clear interval when timer is inactive
    if (!hasStarted) {
      clearInterval(intervalID);
      setIntervalID(undefined);
    }
    // when timer is still active and time runs out, trigger fireworks and reset timer
    else if (hasStarted && seconds <= 0) {
      setHasStarted(false);
      setSeconds(0);
      clearInterval(intervalID);
      setIntervalID(undefined);
      setToggleFireworks(true);
      setTimeout(() => setToggleFireworks(false), 3000);
    }
    // when time has begun but interval is still uninitialized, start interval
    else if (hasStarted && !intervalID) {
      setIntervalID(setInterval(() => {
        millisecondsRef.current -= 100;
        // only change seconds every 1000 milliseconds to ensure re-renders only happen every second.
        if (millisecondsRef.current % 1000 === 0) {
          setSeconds(currentSeconds => currentSeconds - 1)
        }
      }, 100));
    }
  }, [hasStarted, seconds, intervalID]);

  return (<>
    {toggleFireworks && <Fireworks autorun={{ speed: 1, duration: 3000 }} />}
    <Card sx={{ margin: 'auto', display: 'flex', backgroundColor: 'lavender'}}>
      <Box margin="auto" display="flex" alignItems="center" flexDirection="column" fontSize="large">
        <CardContent sx={{ padding: '1em' }}>
        <Stack divider={<Divider />} display="flex" justifyContent="space-between">
          <TimeDisplay totalSeconds={seconds} />
          {controllerButtonsProps.map((buttonConfigs, idx) =>
            <IconButtonRow key={new Date().getTime() + idx} buttonConfigs={buttonConfigs}/>
          )}
          {modifierButtonProps.map(({ title, value }) =>
            <ModifierButtonGroup
              key={new Date().getTime() + title}
              title={title}
              value={value}
              setValue={addSeconds}
              disableAddition={hasStarted || seconds === maximumTime}
              disableSubtraction={hasStarted || seconds === 0}
            />
          )}
          </Stack>
        </CardContent>
      </Box>
    </Card>
  </>);
};
