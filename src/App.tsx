import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostCreationPage from "./pages/PostCreationPage";
import { Toaster } from "sonner";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import AllPostsPage from "./pages/AllPostsPage";
import UserPostsPage from "./pages/UserPostsPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
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
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="all-posts" />} />
              <Route path="all-posts" element={<AllPostsPage />} />
              <Route path="registration-page" element={<RegistrationPage />} />
              <Route path="login-page" element={<LoginPage />} />
              <Route path="create-post" element={<PostCreationPage />} />
              <Route path="user-post" element={<UserPostsPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster position="top-center" />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
