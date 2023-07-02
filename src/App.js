import { Space } from "antd";
import "./App.css";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Space className="hero">
        <SideMenu />
        <Content />
      </Space>
      <Footer />
    </div>
  );
}

export default App;
