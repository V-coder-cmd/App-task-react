import { useState } from "react";
import styles from "./taskInput.module.css";

export default function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    
    addTask(taskText);
    setTaskText(""); 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskInput}>
      <input
        type="text"
        placeholder="Digite o nome da sua tarefa aqui..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
