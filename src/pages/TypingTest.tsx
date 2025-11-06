import React, { useState, useEffect, useRef } from "react";
import TopButtons from "../components/TopButtons";

const TypingTest: React.FC = () => {
  const [typingText, setTypingText] = useState(
    "Like Mahatma Gandhi, African leader Nelson Mandela battled against the oppression of the South African people by whites. He received a legal lawyer education. However, he joined the African National Congress and dedicated himself to the goal of achieving equality among all Africans—white and black—by fighting against the policy of apartheid, or the segregation of the black native Africans from all positions of power and privilege. Instead of living comfortably and in luxury as a successful lawyer, he did the opposite. Nelson Mandela became the first black African to hold the office of President of the Republic of South Africa. Mandela’s greatness stems not only from his success in convincing the white South African government to abolish the hateful and inhuman apartheid, but also from his inspiring call to blacks not to seek vengeance on whites for past acts of tyranny, injustice, and exploitation."
  );
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [mistakes, setMistakes] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Start typing test timer
  const initTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTyping(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Handle typing logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    initTyping();

    const textArray = typingText.split("");
    const inputArray = value.split("");
    let errorCount = 0;

    inputArray.forEach((char, i) => {
      if (char !== textArray[i]) errorCount++;
    });

    setMistakes(errorCount);

    const correctChars = inputArray.length - errorCount;
    const elapsedTime = 60 - timeLeft;

    if (elapsedTime > 0) {
      const cpm = Math.round((correctChars / elapsedTime) * 60);
      const wpm = Math.round(cpm / 5);
      setCPM(cpm);
      setWPM(wpm);
    } else {
      setCPM(0);
      setWPM(0);
    }
  };

  const resetGame = () => {
    clearInterval(timerRef.current!);
    setUserInput("");
    setTimeLeft(60);
    setMistakes(0);
    setWPM(0);
    setCPM(0);
    setIsTyping(false);
    inputRef.current?.focus();
  };

  // Clean up interval
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Automatically focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

return (
  <div>
    <TopButtons />
    <div className="page-container">
      <div className="centerElements">
        <h1>Typing Test</h1>

        {/* Display the text to be typed */}
        <div
          className="typingBox"
          style={{
            cursor: "text",
            padding: "1rem",
            border: "2px solid #ccc",
            borderRadius: "8px",
            minWidth: "500px",
            minHeight: "100px",
            textAlign: "left",
            fontSize: "1.2rem",
            userSelect: "none",
            fontFamily: "monospace",
            marginBottom: "1rem",
          }}
        >
          {typingText.split("").map((char, i) => {
            let color = "";
            if (i < userInput.length) {
              color = char === userInput[i] ? "green" : "red";
            } else if (i === userInput.length && isTyping) {
              color = "gray";
            }
            return (
              <span key={i} style={{ color }}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Bottom input field for typing */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={timeLeft === 0}
          style={{
            padding: "0.75rem 1rem",
            fontSize: "1.2rem",
            border: "2px solid #aaa",
            borderRadius: "8px",
            width: "500px",
            fontFamily: "monospace",
          }}
          placeholder="Start typing here..."
        />

        <div style={{ marginTop: "1.5rem" }}>
          <p>
            <b>Time Left:</b> {timeLeft}s
          </p>
          <p>
            <b>Mistakes:</b> {mistakes}
          </p>
          <p>
            <b>WPM:</b> {WPM}
          </p>
          <p>
            <b>CPM:</b> {CPM}
          </p>
          <button onClick={resetGame} className="btn">
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default TypingTest;
