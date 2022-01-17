import React, { useEffect, useState } from "react";

const formatNumber = (num, places) => String(num).padStart(places, "0");

const computeTime = (sec, min, hr) => {
  return sec + min * 60 + hr * 3600;
};

function TimerExercice({ sec, min, hr }) {
  const [time, setTime] = useState(() => computeTime(sec, min, hr));

  const [resets, setResets] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTime((time) => (time ? time - 1 : 0)), 1000);

    return function cleanup() {
      console.log("Clearing: ", t);
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    setTime(computeTime(sec, min, hr));
  }, [resets, sec, min, hr]);

  const [hours, hrRest] = [Math.floor(time / 3600), time % 3600];
  const [minutes, seconds] = [Math.floor(hrRest / 60), hrRest % 60];

  return (
    <div>
      <div style={{ fontSize: 30, fontWeight: "bold" }}>
        <span>{formatNumber(hours, 2)}</span> :{" "}
        <span>{formatNumber(minutes, 2)}</span> :{" "}
        <span>{formatNumber(seconds, 2)}</span>
      </div>
      <div>
        <button onClick={() => setResets(resets + 1)}>
          Reset Timer {resets}
        </button>
      </div>
    </div>
  );
}

export default TimerExercice;
