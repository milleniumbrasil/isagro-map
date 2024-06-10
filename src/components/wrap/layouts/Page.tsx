
// src/components/wrap/layouts/Page.tsx

import React, { ReactNode } from "react";
import Box from "./Box";

interface PageProps {
  transitionAlert?: ReactNode;
  children?: ReactNode;
}

const Page: React.FC<PageProps> = ({ transitionAlert, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          minHeight: "35px",
          padding: 1,
          margin: 1,
        }}
      >
        {transitionAlert}
      </Box>
      {children}
    </Box>
  );
};

export default Page;
