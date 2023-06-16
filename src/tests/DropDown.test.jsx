import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import DropDown from "../components/DropDown";

describe('dropdown tests', function() {
  test('Component is not shown with description', () => {
    const component = render(
      <DropDown title="Hello" drop={false}>
        <p>World</p>
      </DropDown>
    );

    expect(component.container).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Hello");
    expect(component.container).not.toHaveTextContent("World");
  });

  test('Component is shown with description', () => {
    const component = render(
      <DropDown title="Hello" drop={true}>
        <p>World</p>
      </DropDown>
    );

    expect(component.container).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Hello");
    expect(component.container).toHaveTextContent("World");
  });

  test('Component is nested with other dropdowns', () => {
    const component = render(
      <DropDown title="Hello" drop={true}>
        <DropDown title="World" drop={true}>
          <p>!</p>
        </DropDown>
      </DropDown>
    );

    expect(component.container).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Hello");
    expect(component.container).toHaveTextContent("World");
    expect(component.container).toHaveTextContent("!");
  });
});
