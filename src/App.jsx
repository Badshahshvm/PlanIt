import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./component/Navbar";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setShowFinished] = useState(true);
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const toggleFinished = (e) => {
    setShowFinished(!showfinished);
  };
  const saveTool = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id; // Include a return statement to return the filtered item
    });
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTool();
  };
  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTool();
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveTool();
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTool();
  };

  return (
    <>
      <Navbar />
      <div
        className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 
       min-h-[80vh] md:w-[35%]"
      >
        <h1 className="text-gray-500 font-bold text-2xl text-center">
          PlanIt: Plan your task
        </h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold ">Add Plan</h2>
          <div className="flex m-2 mx-1">
            <input
              type="text"
              className="w-1/2 rounded-full"
              onChange={handleChange}
              value={todo}
            />
            <button
              className="bg-green-500 p-2 text-sm hover:bg-green-600 text-white rounded-full font-bold py-2 mx-6 disabled:bg-green-800"
              onClick={handleAdd}
              disabled={todo.length <= 3}
            >
              Add
            </button>
          </div>
        </div>
        <input
          className="my-4"
          type="checkbox"
          checked={showfinished}
          onChange={toggleFinished}
        />
        Show Finished
        <div className="">
          <h1 className="text-xl font-bold">Your todos</h1>
          <div className="todos">
            {todos.length == 0 && <div className="m-3">No task is here </div>}
            {todos.map((item) => {
              return (
                (showfinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex md:w-1/2 my-3 justify-between"
                  >
                    <div className="flex gap-5">
                      <input
                        name={item.id}
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={handleCheckbox}
                      />

                      <div
                        className={
                          "m-3 " + (item.isCompleted ? "line-through" : "")
                        }
                      >
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex h-full">
                      <button
                        className="bg-yellow-500 p-2 my-1 hover:bg-yellow-600 text-white rounded-lg font-bold py-2 mx-1"
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-red-500 p-2 hover:bg-red-600 text-white rounded-lg font-bold py-1 mx-1"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
