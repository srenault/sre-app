import { Route, Router } from "wouter";
import { useLocationProperty, navigate } from "wouter/use-location";
import Home from "./screens/Home";
import Heaters from "./screens/Heaters";
import Shutters from "./screens/Shutters";
import "./App.css";

import { App as CapacitorApp } from "@capacitor/app";

CapacitorApp.addListener("backButton", ({ canGoBack }) => {
  if (!canGoBack) {
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});

const useHashLocation = (): [string, (to: string) => void] => {
  const hashNavigate = (to: string) => navigate("#" + to);
  const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";
  const location = useLocationProperty(hashLocation);

  return [location, hashNavigate];
};

function App(): JSX.Element {
  return (
    <div className="App">
      <Router hook={useHashLocation}>
        <Route path="/" component={Home}></Route>
        <Route path="/heaters" component={Heaters} />
        <Route path="/shutters" component={Shutters} />
      </Router>
    </div>
  );
}

export default App;
