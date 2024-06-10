
// src/components/wrap/surfaces/Paper.Theme.ts

import { height, margin } from "@mui/system";
import { Theme } from "../../ext/styles/StylesExt";

export const PaperTheme = (theme: Theme) => {
  return {
    width: "82%",
    minHeight: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "1px",
    margin: "1px",
  };
};
