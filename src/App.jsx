import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    //delete todo
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);

    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");

    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    saveToLS();
  };
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-100 min-h-screen md:w-1/2">
        <h1 className="font-bold text-center text-3xl">
          {" "}
          Master your day: The smart & simple way.
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold"> Add a To-Do</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="border border-green-400  focus:outline-none rounded  w-full px-2 py-2"
              placeholder="Enter your task..."
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-600 mx-2 p-4 py-2 text-sm font-bold text-black rounded-md "
            >
              Save
            </button>
          </div>
        </div>
        <input
          className=" my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          id="show"
        />
        <label className="mx-2 " htmlFor="show">
          Show Finished Tasks
        </label>
        <div className="h-[1px] bg-black opacity-55 w-full mx-auto my-3"></div>

        <h2 className="text-xl font-bold">Your Tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5"> No Tasks to show</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex  my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-green-600 hover:bg-green-700 p-2 py-1 text-sm font-bold text-black rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-green-600 hover:bg-green-700 p-2 py-1 text-sm font-bold text-black rounded-md mx-1"
                    >
                      <AiFillDelete />
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
