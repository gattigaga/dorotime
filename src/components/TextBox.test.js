import React from "react";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";
import renderer from "react-test-renderer";

import TextBox from "./TextBox";

let wrapper, textChange;

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
  textChange = jest.fn();
  wrapper = shallow(
    <TextBox label="Working Time" value={32} onChange={textChange} />
  );
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  textChange.mockReset();
});

it("should render label", () => {
  expect(wrapper.find("label").contains("Working Time")).toEqual(true);
});

it("should render value", () => {
  expect(wrapper.find("input").props().value).toEqual(32);
});

it("should call 'onChange'", () => {
  expect(textChange.mock.calls.length).toEqual(0);

  wrapper.find("input").simulate("change", { target: { value: 5 } });

  expect(textChange.mock.calls.length).toEqual(1);
});
