
import Timer from "./Timer";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: "Timer",
};

export default function Page() {
  return <Box
    display="flex"
    flexDirection="column"
    textAlign="center"
    justifyContent="space-around"
    height="100%"
    sx={{
      backgroundColor: 'lavender'
    }}
  >
    <Typography variant="h2" align="center" role="timer">
      Timer
    </Typography>
    <Timer />
  </Box>;
}
