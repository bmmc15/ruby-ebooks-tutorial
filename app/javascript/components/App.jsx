import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../routes";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./Navbar/Navbar";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <>
        <SnackbarProvider maxSnack={3}>
          <Navbar />
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </SnackbarProvider>
      </>
    </Router>
  );
};

export default App;
