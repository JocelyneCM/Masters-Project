import React, { useState, useEffect, useRef } from "react";
import TopButtons from "../components/TopButtons";
import TypingArea from "../components/TypingArea";

const TypingTest: React.FC = () => {
  const [typingText, setTypingText] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [inpFieldValue, setInpFieldValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [mistakes, setMistakes] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start the typing test logic
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

  // Handle user input typing
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setInpFieldValue(value);

    initTyping();

    const currentChars = value.split("");
    const targetChars = typingText.split("");
    let errorCount = 0;
    currentChars.forEach((char, i) => {
      if (char !== targetChars[i]) errorCount++;
    });

    setMistakes(errorCount);

    const correctChars = currentChars.length - errorCount;
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

  // Reset the game
  const resetGame = () => {
    clearInterval(timerRef.current!);
    setTimeLeft(60);
    setInpFieldValue("");
    setMistakes(0);
    setWPM(0);
    setCPM(0);
    setIsTyping(false);
  };

  // Cleanup interval when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      <TopButtons />
      <div className="page-container">
        <div className="centerElements">
          <h1>Typing Test</h1>
          <p>Start typing below to begin!</p>

          <TypingArea
            typingText={typingText}
            inpFieldValue={inpFieldValue}
            timeLeft={timeLeft}
            mistakes={mistakes}
            WPM={WPM}
            CPM={CPM}
            initTyping={initTyping}
            handleKeyDown={handleKeyDown}
            resetGame={resetGame}
          />

          <div className="answerInput">
            <input
              type="text"
              placeholder="Type here..."
              value={inpFieldValue}
              onChange={() => {}} // disable default typing behavior
              onKeyUp={handleKeyDown}
              disabled={timeLeft === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
