import WeatherPage from "./components/WeatherPage";

function App() {
  return (
    <div className="bg-[image:var(--bgImage)] dark:bg-[image:var(--dark-bgImage)] w-full h-screen overflow-auto">
      <div className="w-full min-h-full flex justify-center">
        <WeatherPage />
      </div>
    </div>
  );
}

export default App;
