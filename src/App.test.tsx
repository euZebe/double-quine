import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);

  const toggle = jest.fn(t => t);
  toggle(4);
  expect(toggle.mock.calls).toHaveLength(1);
});
