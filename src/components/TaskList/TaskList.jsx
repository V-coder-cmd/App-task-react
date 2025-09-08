import { useState, useEffect, useCallback } from "react";
import TaskInput from "../TaskInput/TaskInput.jsx";
import styles from "./TaskList.module.css";

export default function TaskList() {

    // literalmente o começo de tudo
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

//   TRANSFORMA OS OBJETOS EM STRING
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

//   ADICIONE UMA TAREFA NOVA
  const addTask = useCallback((text) => {
    if (!text.trim()) return;


    // SETA OS OBJETOS DA TEREFA ADICIONADA
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  }, []);

//   VERIFICAÇÃO PRA VER SE A TAREFA ESTÁ COMPLETADA OU NÃO
  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    setEditingId(null); 
  }, []);


//   REMOVE UMA TAREFA
  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

//   COMEÇO DA EDIÇÃO DE UMA TAREFA
  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

//   SALVA A TAREFA EDITADA
  const saveEditing = (id) => {
    if (!editingText.trim()) return

    // DEIXA O TEXTO NOVO COMO PADRÃO
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );

    setEditingId(null);
    setEditingText("");
  };

  return (
  <section className={styles.taskList}>
    <h2 className={styles.title}>📋 Minhas Tarefas</h2>

    <TaskInput addTask={addTask} />

    {tasks.length === 0 ? (
      <p className={styles.empty}>Nenhuma tarefa adicionada ainda.</p>
    ) : (
      <ul className={styles.list}>
        {tasks.map(({ id, text, completed }) => (
          <li key={id} className={`${styles.item} ${completed ? styles.completed : ""}`}>
            {editingId === id ? (
              <input
                className={styles.editInput}
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEditing(id)}
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

              {!completed && editingId !== id && (
                <button className={styles.editBtn} onClick={() => startEditing(id, text)}>
                  ✏️
                </button>
              )}

              {editingId === id && (
                <button className={styles.saveBtn} onClick={() => saveEditing(id)}>
                  💾
                </button>
              )}

              <button className={styles.deleteBtn} onClick={() => removeTask(id)}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>

  );
}
