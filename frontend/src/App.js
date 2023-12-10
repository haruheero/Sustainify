import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./css/magicbutton.css";
import * as React from "react";
import Header from "./mainComponents/Header";
import MainBody from "./mainComponents/MainBody";
import Footer from "./mainComponents/Footer";
import { StyledEngineProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/results/:parameterName",
    element: <MainBody />,
  },
  {
    path: "/",
    element: <MainBody />,
  },
]);

function App() {
  // const [user] = useAuthState(auth);
  return (
    <>
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <Box
            className="prevent-select"
            sx={{
              backgroundColor: "rgb(31 31 31)",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              height: "100vh",
            }}
          >
            <Header />
            {/* <MainBody /> */}
            <RouterProvider router={router} />
            <Footer />
          </Box>
        </StyledEngineProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
