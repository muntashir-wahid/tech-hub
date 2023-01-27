import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main>
      <nav>
        <p>Hello from the navbar</p>
      </nav>
      <Outlet />
      <footer>
        <p>Hello from the footer</p>
      </footer>
    </main>
  );
};

export default Main;
