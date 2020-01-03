import React from "react";
import { Switch } from "react-router-dom";
import RouteHandler from "./components/RouterHandler";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdPage from "./pages/AdPage";
import AddAd from "./pages/AddAd";
import Ads from "./pages/Ads";

export default () => {
  return (
    <Switch>
      <RouteHandler exact path="/" component={Home} />
      <RouteHandler exact path="/about" component={About} />
      <RouteHandler exact path="/ads" component={Ads} />
      <RouteHandler private exact path="/post-an-ad">
        <AddAd />
      </RouteHandler>
      <RouteHandler exact path="/signin" component={Signin} />
      <RouteHandler exact path="/signup" component={Signup} />
      <RouteHandler exact path="/ad/:id" component={AdPage} />
      <RouteHandler component={NotFound} />
    </Switch>
  );
};
