import {configure} from "@kadira/storybook";

function loadStories() {
  /* eslint-disable global-require */
  require("./date-input");
}

/* eslint-disable react/jsx-filename-extension */
configure(loadStories, module);
