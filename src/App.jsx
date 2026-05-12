import "./App.css";
import AppRouter from "./router/AppRouter";
import { Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <UserProvider>
      <Provider store={store}>
        
          <AppRouter />
        </Provider>
      </UserProvider>
    </div>
  );
}

export default App;

