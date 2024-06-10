
// src/App.tsx

import theme from "./theme";
import { ThemeProvider } from "./components/ext/styles/StylesExt";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dash/Dashboard.Form";
import { AuthProvider } from "./pages/common/AuthContext";

console.log(`The router.tsx loaded all imported files.`);
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
