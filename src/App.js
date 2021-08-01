import './App.css';
import Container from "react-bootstrap/Container";
import SignInForm from "./components/Content/common/SignInForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./components/Content/common/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/Content/MainPage";
import { CLASS } from "./utils/enums";
import { ContextProvider } from "./context/generalContext";
import { UserContextProvider } from "./context/userContext";
import { AllUsersContextProvider } from "./context/allUsersContext";

function App() {
  return (
    <ContextProvider>
        <UserContextProvider>
            <AllUsersContextProvider>
                <div className="App">
                    <Router>
                        <Switch>
                            <Route path='/home'>
                                <MainPage/>
                            </Route>
                            <Route path="/">
                                <div className={CLASS.background}>
                                </div>
                                <Container className={CLASS.mainContainer}>
                                    <SignInForm/>
                                    <SignUp/>
                                </Container>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </AllUsersContextProvider>
        </UserContextProvider>
    </ContextProvider>
  );
}

export default App;
