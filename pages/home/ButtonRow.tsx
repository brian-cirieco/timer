import Button from '@mui/material/Button';
import { ReactElement, ReactNode } from 'react';

///
/// Types
///
export type ButtonProps = {
  title: string;
  ariaLabel?: string;
  startIcon?: ReactElement;
  disabled: boolean;
  handleClick: () => void;
};

type PropsT = {
  buttonConfigs: Array<ButtonProps>;
};

///
/// Main Component
///
export default function ButtonRow({ buttonConfigs }: PropsT ) {
  return <div>
    {buttonConfigs.map(({ ariaLabel, title, startIcon, disabled, handleClick }) =>
      <Button
        key={new Date().getTime() + title}
        variant="outlined"
        disabled={disabled}
        aria-disabled={disabled}
        startIcon={startIcon}
        aria-label={ariaLabel ? ariaLabel : title}
        onClick={handleClick}
      >
        {title}
      </Button>
    )}
  </div>
};
