import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main";
import DropItens from "../pages/dropItens/DropItens";
import ProfessionItens from "../pages/professionItens/ProfessionItens";
import LoginButton from "../common/login/LoginButon";

const MainRoute = ({ component, innerProps, ...props }) => (
  <Route
    {...props}
    render={(props) => (
      <Main component={component} {...props} {...innerProps} />
    )}
  />
);
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <MainRoute
          innerProps={{
            title: "Itens de drop",
            buttons: LoginButton,
          }}
          exact
          path="/"
          component={DropItens}
        />
        <MainRoute
          innerProps={{
            title: "Itens de profissão",
            buttons: LoginButton,
          }}
          exact
          path="/profession"
          component={ProfessionItens}
        />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
