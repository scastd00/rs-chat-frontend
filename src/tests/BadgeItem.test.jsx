import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BadgeItem from "../components/BadgeItem";

test('Component is shown with description', () => {
  const component = render(<BadgeItem title="" icon="" description="Hello" />);

  expect(component.container).toBeInTheDocument();
  expect(component.container).toHaveTextContent("Hello");
});
