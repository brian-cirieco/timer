
import { render, screen, waitFor } from "@testing-library/react";
import ModifierButtonGroup from "../ModifierButtonGroup";
import userEvent from "@testing-library/user-event";

describe('<ModifierButtonGroup />', function() {
  
  test('smoke test', async function() {

    // when component is displayed
    const callback = jest.fn();
    render(<ModifierButtonGroup
      title="1 gold nugget"
      value={1}
      setValue={callback}
      disableAddition={false}
      disableSubtraction={false}
    />)

    // then: two buttons are visible
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    // and: title is visible
    expect(screen.getByText('1 gold nugget')).toBeVisible();

    // and: callback functions are called when clicking either button
    buttons.forEach(async button => await userEvent.click(button));
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
  });
});