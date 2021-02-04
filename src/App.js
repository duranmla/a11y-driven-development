import React, { useRef, useState } from "react";
import { loremIpsum } from "lorem-ipsum";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "./overmind";
import { useState as useOvermind, useActions } from "./overmind";

const overmind = createOvermind(config, { devtools: true });

const Login = () => {
  const [alert, setAlert] = useState(null);
  const actions = useActions();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const auth = (e) => {
    if (passwordRef.current.value) {
      actions.login(usernameRef.current.value);
    } else {
      setAlert("Lame you can't do this!");
    }
  };

  return (
    <div>
      Login
      <form>
        <div>Username:</div>
        <input data-testid="username-input" id="username" ref={usernameRef} />
        <div>Password:</div>
        <input data-testid="password-input" id="password" ref={passwordRef} />
        <div data-testid="submit-btn" onClick={auth}>
          Submit
        </div>
      </form>
      {alert && <p>{alert}</p>}
    </div>
  );
};

const Dash = () => {
  const state = useOvermind();
  const actions = useActions();

  const onLogout = () => {
    actions.login(null);
  };

  const onHi = () => {
    alert("Hola coca-cola!");
  };

  return (
    <div>
      Dash
      <p>Hola, {state.user.username}</p>
      <p>{loremIpsum({ count: 1, units: "paragraph" })}</p>
      <button onClick={onHi}>Hi</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export const Main = () => {
  const state = useOvermind();

  return state.user.username ? <Dash /> : <Login />;
};

export default function App() {
  return (
    <Provider value={overmind}>
      <Main />
    </Provider>
  );
}
