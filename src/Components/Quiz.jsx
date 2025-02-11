import React from "react";
import { useState, useRef } from "react";

import { data } from "../assets/data";

function Quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((options) => {
        options.current.classList.remove("wrong");
        options.current.classList.remove("correct");
        return null;
      });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <>
      <div className="box">
        <div className="app">
          <div className="header">
            <div className="head">
              <img
                src="https://miro.medium.com/v2/resize:fit:1000/1*FBRsnCP9wE84UVW1Kkv5Yw.jpeg"
                alt=""
              />
              <h2>Quizz App</h2>
            </div>

            <p className="pages">
              {index + 1} of {data.length} questions
            </p>
          </div>

          {result ? (
            <></>
          ) : (
            <>
              <div className="qns">
                <p className="p">
                  {index + 1}. {question.question}
                </p>
                <ul>
                  <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
                    {question.option1}
                  </li>
                  <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
                    {question.option2}
                  </li>
                  <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
                    {question.option3}
                  </li>
                  <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
                    {question.option4}
                  </li>
                </ul>
              </div>

              <div className="sb">
                <button onClick={next} className="btn">
                  Next
                </button>
              </div>
            </>
          )}

          {result ? (
            <div className="rebox">
              <h2>
                You Scored {score} out of {data.length}
              </h2>
              <button className="btn" onClick={reset}>
                Reset
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;
