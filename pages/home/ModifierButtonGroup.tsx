import { ReactElement } from "react";
import { Add, Remove } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

type PropsT = {
  title: string;
  value: number;
  setValue: (value: number) => void;
  disableAddition: boolean;
  disableSubtraction: boolean;
}

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
      disabled={disableSubtraction}
      onClick={() => setValue(-value)}
    >
      <Remove />
    </IconButton>
    <h2>{title}</h2>
    <IconButton
      aria-label={`add ${title}`}
      disabled={disableAddition}
      onClick={() => setValue(value)}
    >
      <Add />
    </IconButton>
  </Box>
}