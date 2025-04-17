import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  // State for holding the current todo input and the list of todos
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true); // State to toggle visibility of completed todos

  // useEffect hook to fetch todos from localStorage when the app loads
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos); // If todos are found in localStorage, set them in the state
    }
  }, []);

  // Function to save todos to localStorage
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Function to toggle the visibility of completed tasks
  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  // Function to edit a todo item
  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id); // Find the todo by id
    setTodo(t.todo); // Set the todo to be edited in the input field
    // Delete the todo from the list temporarily for editing
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos); // Update the todos state
    saveToLS(); // Save updated todos to localStorage
  };

  // Function to delete a todo item
  const handleDelete = (e, id) => {
    // Filter out the todo with the given id
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos); // Update the todos state
    saveToLS(); // Save updated todos to localStorage
  };

  // Function to add a new todo
  const handleAdd = () => {
    // Add the new todo to the todos list with a unique id
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo(""); // Reset the input field after adding a todo

    saveToLS(); // Save updated todos to localStorage
  };

  // Function to handle changes in the input field
  const handleChange = (e) => {
    setTodo(e.target.value); // Set the todo input value
  };

  // Function to handle the checkbox for marking a task as completed
  const handleCheckbox = (e) => {
    let id = e.target.name; // Get the id of the todo being checked
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // Toggle the isCompleted status
    setTodos(newTodos); // Update the todos state
    saveToLS(); // Save updated todos to localStorage
  };

  return (
    <>
      <Navbar /> {/* Navbar Component */}
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-100 min-h-screen md:w-1/2">
        <h1 className="font-bold text-center text-3xl">
          {" "}
          Master your day: The smart & simple way.
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold"> Add a To-Do</h2>
          <div className="flex">
            <input
              onChange={handleChange} // Handle changes in the input field
              value={todo} // Set the input value to the todo state
              type="text"
              className="border border-green-400  focus:outline-none rounded  w-full px-2 py-2"
              placeholder="Enter your task..."
            />
            <button
              onClick={handleAdd} // Add new todo on click
              disabled={todo.length <= 3} // Disable button if todo length is less than or equal to 3
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-600 mx-2 p-4 py-2 text-sm font-bold text-black rounded-md "
            >
              Save
            </button>
          </div>
        </div>
        <input
          className=" my-4"
          onChange={toggleFinished} // Toggle the visibility of finished tasks
          type="checkbox"
          checked={showFinished} // Checkbox reflects the state of showFinished
          id="show"
        />
        <label className="mx-2 " htmlFor="show">
          Show Finished Tasks
        </label>
        <div className="h-[1px] bg-black opacity-55 w-full mx-auto my-3"></div>

        <h2 className="text-xl font-bold">Your Tasks</h2>
        <div className="todos">
          {/* Display message if no todos are available */}
          {todos.length === 0 && <div className="m-5"> No Tasks to show</div>}
          {/* Loop through todos and display each item */}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex  my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox} // Handle checkbox change
                      type="checkbox"
                      checked={item.isCompleted} // Reflect completion state
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id); // Edit todo on click
                      }}
                      className="bg-green-600 hover:bg-green-700 p-2 py-1 text-sm font-bold text-black rounded-md mx-1"
                    >
                      <FaEdit /> {/* Edit icon */}
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id); // Delete todo on click
                      }}
                      className="bg-green-600 hover:bg-green-700 p-2 py-1 text-sm font-bold text-black rounded-md mx-1"
                    >
                      <AiFillDelete /> {/* Delete icon */}
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
