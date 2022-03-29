import React from "react";
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
  ThirdPartyEmailPasswordAuth,
  Github,
  Google,
  Facebook,
  Apple,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import Todo from "./components/Todos";
import "./components/Todo.css";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "TodoApp",
    apiDomain: 'https://backend-silk-ten.vercel.app',
    websiteDomain: 'https://frontend-three-swart.vercel.app',
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          Github.init(),
          Google.init(),
          Facebook.init(),
          Apple.init(),
        ],
      },
    }),
    Session.init(),
  ],
});

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          {/*This renders the login UI on the /auth route*/}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          <Route
            path="/"
            element={
              /* This protects the "/" route so that it shows 
                                   <Home /> only if the user is logged in.
                                   Else it redirects the user to "/auth" */
              <ThirdPartyEmailPasswordAuth>
                <Todo />
              </ThirdPartyEmailPasswordAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;


