import React, { useState } from "react";
import "./styles.scss";

function App() {
  const buttons = [
    { symbol: "x", id: "multiply", cols: 1, action: "multiply" },
    { symbol: "/", id: "divide", cols: 1, action: "divide" },
    { symbol: "AC", id: "clear", cols: 1, action: "clear-all" },
    { symbol: "C", id: "clear_one", cols: 1, action: "clear" },
    { symbol: "7", id: "seven", cols: 1, action: "number" },
    { symbol: "8", id: "eight", cols: 1, action: "number" },
    { symbol: "9", id: "nine", cols: 1, action: "number" },
    { symbol: "%", id: "modulo", cols: 1, action: "modulo" },
    { symbol: "4", id: "four", cols: 1, action: "number" },
    { symbol: "5", id: "five", cols: 1, action: "number" },
    { symbol: "6", id: "six", cols: 1, action: "number" },
    { symbol: "-", id: "subtract", cols: 1, action: "subtract" },
    { symbol: "1", id: "one", cols: 1, action: "number" },
    { symbol: "2", id: "two", cols: 1, action: "number" },
    { symbol: "3", id: "three", cols: 1, action: "number" },
    { symbol: "+", id: "add", cols: 1, action: "add" },
    { symbol: ".", id: "decimal", cols: 1, action: "decimal" },
    { symbol: "0", id: "zero", cols: 1, action: "number" },
    { symbol: "=", id: "equals", cols: 2, action: "equals" },
  ];

  const number = "1234567890".split("");
  const operators = "+-x/%".split("");

  const [display, setDisplay] = useState("0");
  const [result, setResult] = useState(0);


  const displayClick = ({ action, symbol }) => {
    if (action === "number") {
      setDisplay((prevDisplay) =>
        prevDisplay === "0" || display.endsWith("=")
          ? symbol
          : prevDisplay + symbol
      );
    } else if (action === "clear") {
      setDisplay((prevDisplay) =>
        prevDisplay.length === 1 ? "0" : prevDisplay.slice(0, -1)
      );
    } else if (action === "clear-all") {
      setDisplay("0");
      setResult(0);
    } else if (action === "equals") {
      calculate();
    } else if (action === "decimal") {
      if (!display.includes(".")) {
        setDisplay((prevDisplay) => prevDisplay + ".");
      }
    } else {
      if (number.includes(display[display.length - 1])) {
        setDisplay(
          display[display.length - 1] !== symbol ? display + symbol : display
        );
      } else if (operators.includes(display[display.length - 1])) {
        if (symbol === "-") {
          if (
            display[display.length - 1] !== "-" &&
            !display.endsWith("=")
          ) {
            setDisplay((prevDisplay) => prevDisplay + symbol);
          }
        } else {
          setDisplay(display.slice(0, -1) + symbol);
        }
      } else if (display.endsWith("=")) {
        setDisplay(() => result + symbol);
      } else {
        setDisplay((prevDisplay) => prevDisplay + symbol);
      }
    }
  };
  

  const calculate = () => {
    let expression = display.replace(/x/g, "*");
    let result = eval(expression);
    setResult(result);
    setDisplay((prev) => prev + "=");
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="display">
          <div className="display__history" id="display">
            {display}
          </div>
          <div className="display__result" id="display">
            {result}
          </div>
        </div>
        <div className="buttons">
          {buttons.map((btn, i) => {
            return (
              <button
                key={i}
                className={`btn btn--${btn.action}`}
                style={{
                  gridColumn: `span ${btn.cols}`,
                  backgroundColor:
                    btn.action === "number"
                      ? "#526D82"
                      : btn.action === "equals"
                      ? "#F5A962"
                      : "#F26C4F",
                }}
                id={btn.id}
                onClick={() => {
                  displayClick({
                    action: btn.action,
                    symbol: btn.symbol,
                  });
                }}
              >
                {btn.symbol}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
