import React from "react";
import Loadable from "react-loadable";

export const LoadableContact = Loadable({
  loader: () => import("../pages/Contact"),
  loading: () => <div>LOADING...</div>
});
