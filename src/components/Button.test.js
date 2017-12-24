import React from "react";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";
import renderer from "react-test-renderer";

import Button from "./Button";

let wrapper, buttonClick;

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
  buttonClick = jest.fn();
  wrapper = shallow(<Button caption="Start" onClick={buttonClick} />);
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  buttonClick.mockReset();
});

it("should render caption", () => {
  expect(wrapper.contains("Start")).toEqual(true);
});

it("should call onClick", () => {
  expect(buttonClick.mock.calls.length).toEqual(0);
  wrapper.simulate("click");
  expect(buttonClick.mock.calls.length).toEqual(1);
});
