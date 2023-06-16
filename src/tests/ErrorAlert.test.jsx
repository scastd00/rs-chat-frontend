import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ErrorAlert from "../components/ErrorAlert";

describe('tests of ErrorAlert component', function() {
  test('Error alert example', () => {
    const component = render(<ErrorAlert />);

    expect(component.container).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Error");
  });

  test('Error alert example with message', () => {
    const component = render(<ErrorAlert content="Hello" />);

    expect(component.container).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Hello");
  });
});
