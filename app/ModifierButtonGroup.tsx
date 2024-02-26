import { ReactElement } from "react";
import { Add, Remove } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';''

///
/// Types
///

type PropsT = {
  title: string;
  value: number;
  setValue: (value: number) => void;
  disableAddition: boolean;
  disableSubtraction: boolean;
}

///
/// Main Component
///

/**
 * Dynamically creates a pair of buttons with a title representing a value in the middle.
 * The buttons will each call the callback function when clicked, and pass through the value represented.
 * The left button displays a minus icon and will run the callback function with the negated value.
 * The right button displays a plus icon and will run the callback function with the value.
 * 
 * e.g.: value = 1 minute. When clicking the minus/left button, setValue(-value) is called.
 * Similarly, when clicking the plus/right button, setValue(value) is called.
 * 
 * When plus is pressed
 */
export default function ModifierButtonGroup({
  title,
  value,
  setValue,
  disableAddition,
  disableSubtraction
}: PropsT): ReactElement<PropsT> {
  return <Box
    display="flex"
    gap="2em"
    justifyContent="space-between"
    alignItems="center"
    sx={{ '& > button': { width: '2em', height: '2em' } }}
  >
    <IconButton
      aria-label={`subtract ${title}`}
      aria-disabled={disableSubtraction}
      disabled={disableSubtraction}
      onClick={() => setValue(-value)}
    >
      <Remove />
    </IconButton>
    <Typography component="h2" fontSize="2em">{title}</Typography>
    <IconButton
      aria-label={`add ${title}`}
      aria-disabled={disableAddition}
      disabled={disableAddition}
      onClick={() => setValue(value)}
    >
      <Add />
    </IconButton>
  </Box>
}