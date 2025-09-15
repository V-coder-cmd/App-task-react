  import { useState, useEffect } from "react";
  import TaskInput from "../TaskInput/TaskInput.jsx";
  import TaskItem from "../TaskItem/TaskItem.jsx";
  import styles from "./TaskList.module.css";

  export default function TaskList() {
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    }, []);

    useEffect(() => {
      if (tasks.length > 0) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        localStorage.removeItem("tasks"); 
      }
    }, [tasks]);


    const addTask = (text) => {
      const newTask = {
        id: Date.now(),
        text,
        completed: false
      };
      setTasks((prev) => [...prev, newTask]);
    };


  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };


  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };



  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section className={styles.taskList}>
      <h2 className={styles.title}>📋 Minhas Tarefas</h2>

      <TaskInput addTask={addTask} />

      {tasks.length === 0 ? (
        <p className={styles.empty}>Nenhuma tarefa adicionada ainda.</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              editTask={editTask}
              removeTask={removeTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
