///
/// Types
///
export type ButtonProps = {
  title: string;
  disabled: boolean;
  onClick: () => void;
};

type PropsT = {
  buttonConfigs: Array<ButtonProps>;
};

///
/// Main Component
///
export default function ButtonRow({ buttonConfigs }: PropsT ) {

  return <div>
    {buttonConfigs.map(({ title, ...props }) =>
      <button key={new Date().getTime() + title} {...props}>{title}</button>
    )}
  </div>
};
