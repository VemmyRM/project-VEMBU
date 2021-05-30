import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SchoolList from "./Components/SchoolList";
import SchoolForm from "./Components/SchoolForm";
import Home from "./Components/Home";
import Edit from "./Components/Edit";
import School from "./Components/School";

//using react-router-dom to set up routing
function App() {
  return (
    <BrowserRouter>
      <Route path="/browse" component={SchoolList} />
      <Route path="/create" component={SchoolForm} />
      <Route path="/" exact component={Home} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/schools/:id" component={School} />
    </BrowserRouter>
  );
}

export default App;
