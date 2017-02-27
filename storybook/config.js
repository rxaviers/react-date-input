import React from "react";
import { configure, addDecorator, setAddon } from "@kadira/storybook";

function loadStories() {
  /* eslint-disable global-require */
  require("./date-input");
}

/* eslint-disable react/jsx-filename-extension */
configure(loadStories, module);
