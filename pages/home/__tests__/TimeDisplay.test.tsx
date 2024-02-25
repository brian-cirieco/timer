import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from "@testing-library/react";
import TimeDisplay from "../TimeDisplay";

describe('<TimeDisplay />', function() {
  test('displays 0 seconds as 0 min and 0 s', function() {
    render(<TimeDisplay totalSeconds={0}/>);
  
    expect(screen.getByRole("timer").innerHTML).toEqual('00 : 00');
  });
  
  test('displays 60 seconds as 1 minute and 0 seconds', function() {
    render(<TimeDisplay totalSeconds={60}/>);
  
    expect(screen.getByRole('timer').innerHTML).toEqual('01 : 00');
  });
  
  test('rounds down milliseconds', function() {
    render(<TimeDisplay totalSeconds={60.5}/>);
  
    expect(screen.getByRole('timer').innerHTML).toEqual('01 : 00');
  });
});
