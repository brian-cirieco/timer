import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Timer from '../Timer';
import { modifierButtonProps } from '../Timer';

///
/// Helper functions
///

/**
 * Default state of timer is defined by:
 * - having time at 0 minutes and 0 seconds
 * - all add time buttons are enabled
 * - all other buttons are disabled
 */
function expectDefaultState() {
  // time at zero
  expect(screen.getByRole('timer').innerHTML).toEqual('00 : 00');
  expect(screen.getAllByRole('button')
    .every(button =>
      button.getAttribute('aria-label')?.startsWith('add')
        // add buttons are enabled
        ? button.getAttribute('aria-disabled') === 'false'
        // other buttons are disabled
        : button.getAttribute('aria-disabled') === 'true')
  ).toBeTruthy();
}

function expectActiveState() {
  // time non-zero
  expect(screen.getByRole('timer').innerHTML).not.toEqual('00 : 00');

  // only stop and reset buttons are enabled
  expect(screen.getAllByRole('button')
    .every(button =>
      button.getAttribute('aria-label') === 'Stop' || button.getAttribute('aria-label') === 'Reset'
        ? button.getAttribute('aria-disabled') === 'false'
        : button.getAttribute('aria-disabled') === 'true')
  ).toBeTruthy();
}

function expectPausedState() {
  // time non-zero
  expect(screen.getByRole('timer').innerHTML).not.toEqual('00 : 00');

  // only stop button is disabled
  expect(screen.getAllByRole('button')
    .every(button => button.getAttribute('aria-label') === 'Stop'
      ? button.getAttribute('aria-disabled') === 'true'
      : button.getAttribute('aria-disabled') === 'false')
  ).toBeTruthy();
}

describe('<Timer />', function() {

  beforeEach(function() {
    render(<Timer />);
  });

  describe('when timer is at default state', function() {
    test('adding time enables all subtraction, start, and reset buttons', async function() {
      // when: user adds 1 minute to timer
      await userEvent.click(screen.getByLabelText('add 1 minute'));
  
      // then: timer displays 01 : 00
      expect(screen.getByRole('timer').innerHTML).toEqual('01 : 00');
  
      // and: all buttons except stop button are enabled
      expect(screen.getAllByRole('button')
        .every(button => button.getAttribute('aria-label') === 'Stop'
          ? button.hasAttribute('disabled')
          : !button.hasAttribute('disabled'))
      );
    });
  
    test('subtracting time down to zero will reset timer to default state', async function() {
      // given: user has added time
      await userEvent.click(screen.getByLabelText('add 10 seconds'));
  
      // when: user removes time down to zero
      await userEvent.click(screen.getByLabelText('subtract 1 minute'));
  
      // then: timer is reset to default state
      expectDefaultState();
    });
  })

  describe('when timer is active', function() {

    beforeEach(async function() {
      await userEvent.click(screen.getByLabelText('add 1 second'));
      await userEvent.click(screen.getByLabelText('Start'));
      expectActiveState();
    });

    test('clicking stop button will set the timer in its paused state', async function() {
      // when: user clicks stop
      await userEvent.click(screen.getByRole('button', { name: 'Stop' }));

      // then: timer is paused
      expectPausedState();
    });

    test('clicking the reset button will set the timer in its default state', async function() {
      // when: user clicks reset
      await userEvent.click(screen.getByRole('button', { name: 'Reset' }));

      // then: timer is reset to default state
      expectDefaultState();
    });

    test('timer resets to default state when time elapses to zero', async function() {

      // when: timer elapses to zero
      await waitFor(() => expect(screen.getByRole('timer').innerHTML).toEqual('00 : 00'));

      // then: timer is at default state
      expectDefaultState();
    });
  });

  describe('when timer is paused', function() {

    beforeEach(async function() {
      await userEvent.click(screen.getByLabelText('add 10 seconds'));
      await userEvent.click(screen.getByRole('button', { name: 'Start' }));
      await userEvent.click(screen.getByRole('button', { name: 'Stop' }));
      expectPausedState();
    });

    test('user can add more time', async function() {
      // when: user adds 10s to timer when paused at 00 : 10
      await userEvent.click(screen.getByLabelText('add 10 seconds'));

      // then: time was successfully added
      expect(screen.getByRole('timer').innerHTML).toEqual('00 : 20');

      // and: timer is still paused
      expectPausedState();
    });

    test('timer is active after hitting play again', async function() {
      // when: user clicks play button
      await userEvent.click(screen.getByRole('button', { name: 'Start' }));

      // then: timer is active again
      expectActiveState();
    });

    test('timer is reset after clicking reset button', async function() {
      // when: user clicks reset button
      await userEvent.click(screen.getByRole('button', { name: 'Reset' }));

      // then: timer is at default state
      expectDefaultState();
    });

  });
});
