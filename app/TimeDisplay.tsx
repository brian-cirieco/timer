import { ReactElement } from "react";
import Typography from '@mui/material/Typography';

///
/// Utility Functions
///

function formatDisplayDigits(num: string): string {
  return num.length >= 2 ? num : '0' + num;
}

///
/// Types
///

type PropsT = {
  totalSeconds: number;
}

///
/// Main Component
///

/**
 * Displays total number of seconds in mm : ss format.
 * Converts seconds to minutes as needed.
 */
function TimeDisplay({ totalSeconds }: PropsT): ReactElement<PropsT> {

  const minutes = Math.floor(totalSeconds / 60).toString();
  const seconds = totalSeconds % 60 === 0 ? '00' : Math.floor(totalSeconds % 60).toString();

  return <Typography variant="h1" align="center" role="timer">
    {formatDisplayDigits(minutes)} : {formatDisplayDigits(seconds)}
  </Typography>
}

export default TimeDisplay;