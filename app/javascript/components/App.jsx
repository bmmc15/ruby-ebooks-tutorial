import React from "react";
import Routes from "../routes";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <>{Routes}</>;
    </QueryClientProvider>
  );
};

export default App;
