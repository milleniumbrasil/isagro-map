
// src/pages/dash/Map.Theme.ts

import { Theme } from "../../components/ext/styles/StylesExt";

export const DashboardTheme = (theme: Theme) => {
  return {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "84%",
    minHeight: "84%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: theme.spacing(4),
  };
};
