import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Result from "./pages/Result";
import { CartProvider } from "use-shopping-cart";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();
const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider
        mode="payment"
        cartMode="checkout-session"
        stripe={stripeKey}
        currency="USD"
      >
        <BrowserRouter>
          <Toaster position="bottom-center" />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/result" component={Result} />
            <Route path="/:productId" component={Product} />
          </Switch>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
