import { ReactElement } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

///
/// Types
///
export type IconButtonPropsT = {
  ariaLabel: string;
  icon: ReactElement;
  disabled: boolean;
  variant: "default" | "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  handleClick: () => void;
};

type PropsT = {
  buttonConfigs: Array<IconButtonPropsT>;
};

///
/// Main Component
///
export default function IconButtonRow({ buttonConfigs }: PropsT ) {
  return <Box display="flex" justifyContent="space-between" alignItems="center">
    {buttonConfigs.map(({ ariaLabel, icon, disabled, variant, handleClick }) =>
      <IconButton
        key={new Date().getTime() + ariaLabel}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        onClick={handleClick}
        color={variant}
        size="large"
      >
        {icon}
      </IconButton>
    )}
  </Box>
};
