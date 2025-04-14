import React, { useEffect, useState } from "react";

const EditTask = ({
  task,
  index,
  taskList,
  setTaskList,
  completed,
  setCompleted,
}) => {
  const [editModal, setEditModal] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  useEffect(() => {
    setProjectName(task.projectName);
    setProjectDescription(task.projectDescription);
  }, []);
  const handelInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") setProjectName(value);
    if (name === "projectDescription") setProjectDescription(value);
  };
  const handelUpdate = (e) => {
    e.preventDefault();

    const updatedTask = {
      id: task.id,
      projectName: projectName,
      projectDescription: projectDescription,
    };

    if (taskList && taskList.includes(task)) {
      let taskIndex = taskList.indexOf(task);
      taskList.splice(taskIndex, 1, updatedTask);
      setTaskList([...taskList]);
      localStorage.setItem("taskList", JSON.stringify(taskList));
    } else if (completed && completed.includes(task)) {
      let taskIndex = completed.indexOf(task);
      completed.splice(taskIndex, 1, updatedTask);
      setCompleted([...completed]);
      localStorage.setItem("completed", JSON.stringify(completed));
    }

    setEditModal(false);
  };

  return (
    <div>
      <button
        className="bg-[rgb(99_95_199)] bg-opacity-100 text-white text-sm font-semibold rounded-lg py-1.5 px-5 transition-transform transform hover:scale-105"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal && (
        <div className="flex items-center justify-center fixed inset-0 z-50 ">
          <div className="w-11/12 sm:w-9/12 lg:w-1/2 bg-white rounded-lg shadow-xl max-w-lg">
            <div className="flex justify-between items-center p-5 bg-[rgb(99_95_199)] bg-opacity-100 text-white rounded-t-lg">
              <h3 className="text-white text-2xl font-bold">Update Task</h3>
              <button
                className="text-white text-2xl font-bold"
                onClick={() => setEditModal(false)}
              >
                &times;
              </button>
            </div>
            <form className="px-6 pt-6 pb-4" onSubmit={handelUpdate}>
              <div>
                <label
                  className="uppercase text-gray-700 font-semibold mb-2 block"
                  htmlFor="project-name"
                >
                  Project Name
                </label>
                <input
                  className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="project-name"
                  type="text"
                  name="projectName"
                  value={projectName}
                  onChange={handelInput}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div>
                <label
                  className="uppercase text-gray-700 font-semibold mb-2 block"
                  htmlFor="task-description"
                >
                  Task Description
                </label>
                <textarea
                  className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="task-description"
                  rows="5"
                  name="projectDescription"
                  value={projectDescription}
                  onChange={handelInput}
                  placeholder="Enter task description"
                ></textarea>
              </div>
              <div className="flex justify-end p-6">
                <button
                  type="submit"
                  className="bg-[rgb(99_95_199)] bg-opacity-100 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTask;
