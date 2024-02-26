import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from "@testing-library/react";
import TimeDisplay from "../TimeDisplay";

describe('<TimeDisplay />', function() {
  test('displays 0 seconds as 0 min and 0 s', function() {
    // when: component is rendered with 0 seconds
    render(<TimeDisplay totalSeconds={0}/>);
  
    // then: display shows 0 minutes and 0 seconds with two digits each
    expect(screen.getByRole("timer").innerHTML).toEqual('00 : 00');
  });
  
  test('displays 60 seconds as 1 minute and 0 seconds', function() {
    // when: component is rendered with 60 seconds
    render(<TimeDisplay totalSeconds={60}/>);
  
    // then: display shows 1 minute and 60 seconds
    expect(screen.getByRole('timer').innerHTML).toEqual('01 : 00');
  });
  
  test('displays both minute and seconds when total seconds are not a multiple of 60', function() {
    // when: component is rendered with 61 seconds
    render(<TimeDisplay totalSeconds={61}/>);
  
    // then: display shows 1 minute and 1 second with leading zeros
    expect(screen.getByRole('timer').innerHTML).toEqual('01 : 01');
  });
});
