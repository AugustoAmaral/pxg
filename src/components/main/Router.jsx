import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main";
import DropItens from "../pages/dropItens/DropItens";
import ProfessionItens from "../pages/professionItens/ProfessionItens";

const MainRoute = ({ component, innerProps, ...props }) => (
  <Route
    {...props}
    render={(props) => (
      <Main component={component} {...props} {...innerProps} />
    )}
  />
);
const Routes = ({ user }) => {
  return (
    <BrowserRouter>
      <Switch>
        <MainRoute
          innerProps={{
            title: "Itens de drop",
          }}
          path="/drop-itens"
          component={DropItens}
        />
        <MainRoute
          innerProps={{
            title: "Itens de profissão",
          }}
          path="/"
          component={ProfessionItens}
        />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
