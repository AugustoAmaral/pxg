import React, { useEffect } from "react";
import Router from "./Router";
import user from "../../config/User";

function App() {
  useEffect(() => {
    user.init();
  }, []);
  return (
    <>
      <Router />
    </>
  );
}

export default App;
