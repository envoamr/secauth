import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Layout from "../components/layout";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import axios from "axios";
import to from "await-to-js";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
