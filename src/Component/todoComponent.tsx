import { useState, type JSX } from "react";
import { v4 as uuidv4 } from 'uuid'; // Install: npm install uuid
import "./todoComponent.css";

type Task = {
  id: string;
  text: string;
};

const Todo = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]); // store by task id

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskObj: Task = {
        id: uuidv4(),
        text: newTask,
      };
      setTasks((prev) => [...prev, newTaskObj]);
      setNewTask("");
    }
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setCompletedTasks((prev) => prev.filter((taskId) => taskId !== id));
  }

  function moveTaskUp(index: number) {
    if (index > 0) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      setTasks(updated);
    }
  }

  function taskCompleted(id: string) {
    if (!completedTasks.includes(id)) {
      setCompletedTasks((prev) => [...prev, id]);
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add your task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="input-btn" onClick={addTask}>
          Add➕
        </button>
      </div>

      <h1>Todo List</h1>

      <ol className="list-container">
        {tasks.map((task, index) => (
          <li
            className="list-item"
            key={task.id}
            style={{
              backgroundColor: completedTasks.includes(task.id) ? "green" : "",
              color: completedTasks.includes(task.id) ? "white" : "",
              textDecoration: completedTasks.includes(task.id) ? "line-through" : "",
              padding: "10px",
              marginBottom: "5px",
              cursor: "pointer",
            }}
          >
            <div className="list-text">{task.text}</div>
            <div>
              <button
                className="list-btn"
                onClick={() => deleteTask(task.id)}
                title="Delete"
              >
                ❌
              </button>
              <button
                className="list-btn"
                onClick={() => moveTaskUp(index)}
                title="Move task up"
              >
                👆
              </button>
              <button
                className="list-btn"
                onClick={() => taskCompleted(task.id)}
                title="Completed"
              >
                ✅
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;
