import { useState } from "react";
import styles from "./TaskItem.module.css";

export default function TaskItem({ task, toggleTask, editTask, editComment, removeTask }) {
  const { id, text, completed, comment } = task;

  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(text);

  const [isCommenting, setIsCommenting] = useState(false);
  const [tempComment, setTempComment] = useState(comment);

  // Salvar edição de texto
  const saveEdit = () => {
    if (tempText.trim()) {
      editTask(id, tempText);
      setIsEditing(false);
    }
  };

  // Salvar comentário
  const saveComment = () => {
    editComment(id, tempComment);
    setIsCommenting(false);
  };

  return (
    <li className={`${styles.item} ${completed ? styles.completed : ""}`}>
      {/* Texto */}
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

      {/* Comentário */}
      {isCommenting ? (
        <div>
          <input
            className={styles.editInput}
            type="text"
            value={tempComment}
            onChange={(e) => setTempComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveComment()}
            autoFocus
          />
          <button className={styles.saveBtn} onClick={saveComment}>
            💬 Salvar
          </button>
        </div>
      ) : (
        <div>
          {comment && <p className={styles.comment}>💭 {comment}</p>}
          <button
            className={styles.editBtn}
            onClick={() => setIsCommenting(true)}
          >
            💬 {comment ? "Editar comentário" : "Comentar"}
          </button>
        </div>
      )}

      {/* Ações */}
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
