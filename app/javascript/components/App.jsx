import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import AppRoutes from "../routes";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./Navbar/Navbar";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </>
    </Router>
  );
};

export default App;
