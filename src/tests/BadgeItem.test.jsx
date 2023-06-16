import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BadgeItem from "../components/BadgeItem";

describe('tests of BadgeItem component', function() {
  test('Component is shown with description', () => {
    const component = render(<BadgeItem title="" icon="" description="Hello" />);

    expect(component.container).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Hello");
  });

  test('Component is shown with title', () => {
    const component = render(<BadgeItem title="Hello" icon="" description="Test description" />);

    expect(component.container).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Hello");
    expect(component.container).toHaveTextContent("Test description");
  });

  test('Component is shown with icon', () => {
    const component = render(<BadgeItem title="" icon="https://via.placeholder.com/150" description="" />);

    expect(component.container).toBeInTheDocument();
    expect(component.container).toHaveTextContent("");

    const img = component.container.querySelector("img");
    expect(img).toBeInTheDocument();

    expect(img).toHaveAttribute("src", "https://via.placeholder.com/150");
  });
});
