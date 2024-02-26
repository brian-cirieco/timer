import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { render, screen, waitFor } from "@testing-library/react";
import IconButtonRow, { IconButtonPropsT } from "../IconButtonRow";

describe('<ButtonRow />', function() {
  it('displays 3 buttons with the correct titles, disabled, and callbacks', async function() {
    
    // when: button configurations are passed to ButtonRow
    const callbackMock = jest.fn();
    const buttonConfigs: Array<IconButtonPropsT> = [
      { ariaLabel: 'button 1', icon: <div id="icon1" />, disabled: true, variant: "success", handleClick: callbackMock },
      { ariaLabel: 'button 2', icon: <div id="icon2" />, disabled: false, variant: "success", handleClick: callbackMock },
      { ariaLabel: 'button 3', icon: <div id="icon2" />, disabled: false, variant: "success", handleClick: callbackMock }
    ];
    
    render(<IconButtonRow buttonConfigs={buttonConfigs}/>);

    // then: buttons are shown to user
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(buttonConfigs.length);

    // and: disabled attributes are mapped appropriately
    buttonConfigs.forEach(({ ariaLabel, disabled }) => {
      expect(screen.getByLabelText(ariaLabel).hasAttribute('disabled')).toEqual(disabled);
    });

    // and: callbacks are called only when enabled buttons are clicked
    // clicking disabled buttons causes an error to be thrown, so we avoid clicking them here
    // for reference: https://github.com/testing-library/user-event/issues/662
    buttons.forEach((button, idx) => !buttonConfigs[idx].disabled && userEvent.click(button));
    await waitFor(() => expect(callbackMock).toHaveBeenCalledTimes(2));
  });
});
