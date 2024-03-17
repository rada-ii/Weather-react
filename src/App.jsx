import "./App.css";
//fonts
import "../src/fonts/Runboy Free Trial.woff";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import Location from "./components/Location";
import Temperature from "./components/Temperature";
import Forecast from "./components/Forecast";

function App() {
  return (
    <div className="mx-auto max-w-screen-md my-4 py-5 px-32 bg-gradient-to-br from-cyan-700 via-sky-300 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons />
      <Inputs />

      <Location />
      <Temperature />
      <Forecast weather="hourly forecast" />
      <Forecast weather="daily forecast" />
    </div>
  );
}

export default App;
