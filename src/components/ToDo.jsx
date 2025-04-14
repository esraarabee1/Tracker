import React from "react";
import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

const ToDo = ({
  task,
  index,
  taskList,
  setTaskList,
  completed,
  setCompleted,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: { id: task.id }, // نمرر id
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handelDelete = () => {
    if (taskList.some((t) => t.id === task.id)) {
      const updatedTaskList = taskList.filter((_, i) => i !== index);
      setTaskList(updatedTaskList);
      localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    } else if (completed.some((t) => t.id === task.id)) {
      const updatedCompleted = completed.filter((_, i) => i !== index);
      setCompleted(updatedCompleted);
      localStorage.setItem("completed", JSON.stringify(updatedCompleted));
    }
  };

  return (
    <div
      className="flex flex-col items-start justify-start bg-white shadow-md rounded-lg my-4   py-4 px-6 w-full max-w-lg "
      ref={drag}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div className="flex w-full justify-between">
        <p className="text-2xl font-bold text-gray-700 mb-2">
          {task.projectName}
        </p>
        <EditTask
          task={task}
          index={index}
          taskList={taskList}
          setTaskList={setTaskList}
          completed={completed}
          setCompleted={setCompleted}
        />
      </div>
      <div className="flex w-full justify-between ">
        <p className="text-sm text-gray-700 italic">
          {task.projectDescription}
        </p>
        <div className="">
          <button
            className="bg-gray-500 text-white text-sm font-semibold rounded-lg py-1.5 px-3"
            onClick={handelDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
