import React from "react";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";
import renderer from "react-test-renderer";

import Stat from "./Stat";

let wrapper;

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
  wrapper = shallow(<Stat total={5} name="Completed Task" />);
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

it("should render total tasks", () => {
  expect(wrapper.find("p").contains(5)).toEqual(true);
});

it("should render name", () => {
  expect(wrapper.find("p").contains("Completed Task")).toEqual(true);
});
