import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ErrorAlert from "../components/ErrorAlert";

test('Login tests', () => {
  const component = render(<ErrorAlert />);

  expect(component.container).toBeInTheDocument();
  expect(component.container).toHaveTextContent("Error");
})
