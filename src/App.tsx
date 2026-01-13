import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostCreationPage from "./pages/PostCreationPage";
import { Toaster } from "sonner";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Navigate replace to="homepage" />} />
            <Route path="homepage" element={<HomePage />} />
            <Route path="registration-page" element={<RegistrationPage />} />
            <Route path="login-page" element={<LoginPage />} />
            <Route path="create-post" element={<PostCreationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" />
    </QueryClientProvider>
  );
};

export default App;
