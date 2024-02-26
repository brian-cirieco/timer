import Timer from "./Timer";
import Box from '@mui/material/Box';

export const metadata = {
  title: "Timer",
};

export default function Page() {
  return <Box display="flex" flexDirection="column" textAlign="center">
    <h1 role="heading">Timer</h1>
    <Timer />
  </Box>;
}
