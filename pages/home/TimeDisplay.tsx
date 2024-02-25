import { ReactElement } from "react";

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

function TimeDisplay({ totalSeconds }: PropsT): ReactElement<PropsT> {

  const minutes = Math.floor(totalSeconds / 60).toString();
  const seconds = totalSeconds % 60 === 0 ? '00' : Math.floor(totalSeconds % 60).toString();

  return <div id="time-display" role="timer">
    {formatDisplayDigits(minutes)} : {formatDisplayDigits(seconds)}
  </div>;
}

export default TimeDisplay;