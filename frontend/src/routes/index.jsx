import { useRoutes } from "react-router-dom";

// Pages
import SignInPage from "../pages/sign-in";
import OtpPage from "../pages/challenge/otp";
import ProductPage from "../pages/challenge/product";
import WordPage from "../pages/challenge/word";

export const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <SignInPage />,
    },
    {
      path: "/challenge/otp",
      element: <OtpPage />,
    },
    {
      path: "/challenge/product",
      element: <ProductPage />,
    },
    {
      path: "/challenge/word",
      element: <WordPage />,
    },
  ]);
};
