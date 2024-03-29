import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../feature/about/AboutPage";
import Catalog from "../../feature/catalog/Catalog";
import ProductDetails from "../../feature/catalog/ProductDetails";
import HomePage from "../../feature/home/HomePage";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../feature/basket/BasketPage";
import agent from "../api/agent";
import { COOKIE_BASKET, getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../feature/checkout/CheckoutPage";
import ContactPage from "../../feature/contact/ContactPage";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../feature/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  const effectRan = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV === "production") {
      const buyerId = getCookie(COOKIE_BASKET);
      if (buyerId) {
        agent.Basket.get()
          .then((basket) => {
            dispatch(setBasket(basket));
          })
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  if (loading) return <LoadingComponent message="Initialising app..." />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<ProductDetails />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="server-error" element={<ServerError />} />
          <Route path="basket" element={<BasketPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
