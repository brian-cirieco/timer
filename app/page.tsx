
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
    padding="5%"
    height="80vh"
  >
    <Typography variant="h1" align="center" role="heading" fontSize="80px">
      Timer
    </Typography>
    <Timer />
  </Box>;
}
