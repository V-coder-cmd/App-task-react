import { useState } from "react";
import styles from "./TaskItem.module.css";

export default function TaskItem({ task, toggleTask, editTask, removeTask }) {
  const { id, text, completed } = task;

  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(text);

  
  const saveEdit = () => {
    if (tempText.trim()) {
      editTask(id, tempText);
      setIsEditing(false);
    }
  };

  return (
    <li className={`${styles.item} ${completed ? styles.completed : ""}`}>
 
      {isEditing ? (
        <input
          className={styles.editInput}
          type="text"
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          autoFocus
        />
      ) : (
        <span className={styles.text}>{text}</span>
      )}

      <div className={styles.actions}>
        <button
          className={`${styles.statusBtn} ${completed ? styles.done : styles.pending}`}
          onClick={() => toggleTask(id)}
        >
          {completed ? "✅ Concluída" : "⏳ Pendente"}
        </button>

        {!completed && !isEditing && (
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
            ✏️
          </button>
        )}

        {isEditing && (
          <button className={styles.saveBtn} onClick={saveEdit}>
            💾
          </button>
        )}

        <button className={styles.deleteBtn} onClick={() => removeTask(id)}>
          ❌
        </button>
      </div>
    </li>
  );
}
