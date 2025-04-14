import React, { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("taskList");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: Date.now(),
            projectName: "Example Task",
            projectDescription: "This is a sample task.",
          },
        ];
  });

  const [completed, setCompleted] = useState(() => {
    const savedCompleted = localStorage.getItem("completed");
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });

  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addToCompleted(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (id) => {
    console.log(taskList, "taskList");
    const movedTask = taskList.find((task) => task.id === id);
    if (movedTask) {
      const updatedTaskList = taskList.filter((task) => task.id !== id);
      console.log(updatedTaskList, "updatedTaskList");

      setTaskList(updatedTaskList);
      updateLocalStorage("taskList", updatedTaskList);

      setCompleted((prev) => {
        const updatedCompleted = [...prev, movedTask];
        updateLocalStorage("completed", updatedCompleted);
        return updatedCompleted;
      });
    }
  };

  return (
    <div className="bg-[rgb(244_247_253)] bg-opacity-75 min-h-screen">
      <h1 className="text-4xl text-black font-bold  text-center py-8 ">
        Task Tracker
      </h1>
      <div className="flex flex-row items-center justify-center space-x-4 mb-6">
        <p className="text-xl text-black">click </p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl text-black">to add a new task</p>
      </div>
      <div className="flex flex-row space-x-8 justify-center">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700 bg-[rgb(99_95_199)] bg-opacity-100 text-white py-3 rounded-t-lg">
            To Do:
          </h2>
          {taskList.map((task, i) => (
            <ToDo
              key={task.id}
              task={task}
              index={i}
              taskList={taskList}
              setTaskList={setTaskList}
              completed={completed}
              setCompleted={setCompleted}
            />
          ))}
        </div>
        <div
          className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
          ref={drop}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-700 bg-[rgb(99_95_199)] bg-opacity-100 text-white py-3 rounded-t-lg ">
            Completed:
          </h2>
          {completed.map((task, i) => (
            <ToDo
              key={task.id}
              task={task}
              index={i}
              taskList={taskList}
              setTaskList={setTaskList}
              completed={completed}
              setCompleted={setCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
