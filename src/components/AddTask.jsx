import React, { useState } from "react";

const AddTask = ({ taskList, setTaskList }) => {
  const [addModal, setAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const handelInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") setProjectName(value);
    if (name === "projectDescription") setProjectDescription(value);
  };
  const handelAdd = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      projectName,
      projectDescription,
    };

    const updatedList = [...taskList, newTask];
    setTaskList(updatedList);
    localStorage.setItem("taskList", JSON.stringify(updatedList));

    setAddModal(false);
    setProjectName("");
    setProjectDescription("");
  };

  return (
    <div>
      <button
        className="bg-[rgb(99_95_199)] bg-opacity-100 text-white uppercase text-sm font-semibold py-2 px-4 rounded transition duration-300 hover:scale-105 transform"
        type="button"
        onClick={() => setAddModal(true)}
      >
        + New Task
      </button>
      {addModal ? (
        <>
          <div className="flex items-center justify-center fixed inset-0 z-50 ">
            <div className="w-9/12  bg-white rounded-lg shadow-xl max-w-lg">
              <div className="flex flex-row justify-between p-5 bg-[rgb(99_95_199)] bg-opacity-100 text-white rounded-t-lg">
                <h3 className="text-white text-3xl">Add New Task</h3>
                <button
                  className="text-white text-3xl leading-none block"
                  onClick={() => setAddModal(false)}
                >
                  &times;
                </button>
              </div>
              <form className="px-6 pt-6 pb-4">
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
                    placeholder="Enter task description"
                    name="projectDescription"
                    value={projectDescription}
                    onChange={handelInput}
                  ></textarea>
                </div>
              </form>
              <div className="flex justify-end p-6">
                <button
                  className="bg-[rgb(99_95_199)] bg-opacity-100 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                  onClick={handelAdd}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AddTask;
