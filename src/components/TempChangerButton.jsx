import "./css/tempChanger.css";

function TempChangerButton({ tempFahrenheit, setTempFahrenheit }) {
  return (
    <>
      <input
        onChange={() => setTempFahrenheit((prev) => !prev)}
        type="checkbox"
        className="temp_changer"
        id="temp-toggle"
        checked={tempFahrenheit}
      />
      <label id="temp_label" htmlFor="temp-toggle">
        <span className="temp celsius">°C</span>
        <span className="temp fahrenheit">°F</span>
      </label>
    </>
  );
}

export default TempChangerButton;
