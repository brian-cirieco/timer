import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { render, screen } from "@testing-library/react";
import IconButtonRow, { IconButtonPropsT } from "../IconButtonRow";

describe('<ButtonRow />', function() {
  it('displays 3 buttons with the correct titles, disabled, and callbacks', async function() {
    
    // when: button configurations are passed to ButtonRow
    const callbackMock = jest.fn();
    const buttonConfigs: Array<IconButtonPropsT> = [
      { title: 'button 1', disabled: true, handleClick: callbackMock },
      { title: 'button 2', disabled: false, handleClick: callbackMock },
      { title: 'button 3', disabled: false, handleClick: callbackMock }
    ];
    
    render(<IconButtonRow buttonConfigs={buttonConfigs}/>);

    // then: buttons are shown to user
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(buttonConfigs.length);

    // and: disabled attributes are mapped appropriately
    buttonConfigs.forEach(({ title, disabled }) => {
      expect(screen.getByText(title).hasAttribute('disabled')).toEqual(disabled);
    });

    // and: callbacks are called only when enabled buttons are clicked
    await Promise.all(buttons.map(button => userEvent.click(button)));
    expect(callbackMock).toHaveBeenCalledTimes(buttonConfigs.filter(({ disabled }) => !disabled).length);
  });
});
