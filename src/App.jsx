import { Route, Routes } from "react-router-dom";
import SigninPage from "./components/templates/SigninPage";
import "./styles/tailwind.css";
import GlobalFonts from "./utils/fonts";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <GlobalFonts />
      <Layout>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
