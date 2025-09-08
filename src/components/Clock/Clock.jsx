import { useState, useEffect } from "react";
import styles from "./Clock.module.css";


export default function Clock(){
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []); 

  return (
    <div className={styles.clockContainer}>
        <h2 className={styles.hora}>{date.toLocaleDateString()} {date.toLocaleTimeString()}</h2>
    </div>

  );
}