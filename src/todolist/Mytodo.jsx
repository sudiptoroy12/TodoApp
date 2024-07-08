import React, { useEffect, useState } from "react";
import "./Mytodo.css";
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Mytodo = () => {
  const [completeScreen, setCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [allCompleteTodos, setAllCompleteTodos] = useState([]);
  const [editTodos, setEdiTodos] = useState("");
  const [editedItem, setEditedItem] = useState("");
  const handelAddtodos = () => {
    let newTodos = {
      Title: addTitle,
      Description: addDescription,
    };
    let updateTodosArr = [...allTodos];
    updateTodosArr.push(newTodos);
    setAllTodos(updateTodosArr);
    localStorage.setItem("todolist", JSON.stringify(updateTodosArr));
  };
  const handelDeleteTodos = (index) => {
    let reduceTodos = [...allTodos];
    reduceTodos.splice(index, 1);
    setAllTodos(reduceTodos);
    localStorage.setItem("todolist", JSON.stringify(reduceTodos));
  };
  const handelcompletetodos = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completeOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    let completeTodos = {
      ...allTodos[index],
      completeOn: completeOn,
    };
    let updateCompleteTodosArr = [...allCompleteTodos];
    updateCompleteTodosArr.push(completeTodos);
    setAllCompleteTodos(updateCompleteTodosArr);
    handelDeleteTodos(index);
    localStorage.setItem(
      "completedtodolist",
      JSON.stringify(updateCompleteTodosArr)
    );
  };
  const handelDeleteCompleteTodos = (index) => {
    let reduceTodos = [...allCompleteTodos];
    reduceTodos.splice(index, 1);
    setAllCompleteTodos(reduceTodos);
    localStorage.setItem("completedtodolist", JSON.stringify(reduceTodos));
  };
  const handelEdittodos = (index) => {
    setEdiTodos(index);
    setEditedItem(allTodos[index]);
  };
  const handelEditTitle = (value) => {
    setEditedItem((prev) => {
      return { ...prev, Title: value };
    });
  };
  const handelEditDescription = (value) => {
    setEditedItem((prev) => {
      return { ...prev, Description: value };
    });
  };
  const handelUpdatetodos = () => {
    let updatetodos = [...allTodos];

    updatetodos[editTodos] = editedItem;
    setAllTodos(updatetodos);
    setEdiTodos("");
    localStorage.setItem("todolist", JSON.stringify(updatetodos));
  };

  useEffect(() => {
    let saveTodos = JSON.parse(localStorage.getItem("todolist"));
    let saveCompletedTodos = JSON.parse(
      localStorage.getItem("completedtodolist")
    );
    let saveUpdateTodos = JSON.parse(localStorage.getItem("todolist"));
    if (saveTodos) {
      setAllTodos(saveTodos);
    }
    if (saveCompletedTodos) {
      setAllCompleteTodos(saveCompletedTodos);
    }
    if (saveUpdateTodos) {
      setAllTodos(saveUpdateTodos);
    }
  }, []);
  return (
    <div className="mytodos">
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
      >
        My Todos
      </motion.h1>
      <div>
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="wrapper"
        >
          <div className="todo-input">
            <div className="todo-input-item">
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="Task Title"
                value={addTitle}
                name="title"
                onChange={(e) => {
                  setAddTitle(e.target.value);
                }}
              />
            </div>
            <div className="todo-input-item">
              <label htmlFor="">Description</label>
              <input
                type="text"
                placeholder="Task desription"
                value={addDescription}
                name="description"
                onChange={(e) => {
                  setAddDescription(e.target.value);
                }}
              />
            </div>
            <div className="todo-input-item">
              <motion.button
                type="button"
                className="primaryBtn addbtn"
                onClick={handelAddtodos}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
          </div>
        </motion.div>
        <div className="btn">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`secondaryBtn todoBtn ${
              completeScreen === false && "active"
            }`}
            onClick={() => setCompleteScreen(false)}
          >
            Todo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`secondaryBtn completeBtn ${
              completeScreen === true && "active"
            }`}
            onClick={() => setCompleteScreen(true)}
          >
            Completed
          </motion.button>
        </div>
        <div className="cards">
        <AnimatePresence>
          {completeScreen === false &&
            allTodos.map((item, index) => {
              if (editTodos === index) {
                return (
                  <div className="edittodos" key={index}>
                    <input
                      placeholder="Edit title"
                      name="edittitle"
                      onChange={(e) => {
                        handelEditTitle(e.target.value);
                      }}
                      value={editedItem.Title}
                    />
                    <input
                      placeholder="Edit description"
                      name="editdescription"
                      onChange={(e) => {
                        handelEditDescription(e.target.value);
                      }}
                      value={editedItem.Description}
                    />
                    <button
                      type="button"
                      className="primaryBtn"
                      onClick={handelUpdatetodos}
                    >
                      update
                    </button>
                  </div>
                );
              } else {
                return (
                  
                  <motion.div
                    className="todoListArea"
                    key={index}
                    initial={{
                      x: "150vw",
                      transition: { type: "spring", duration: 1.2 },
                    }}
                    animate={{
                      x: 0,
                      transition: { type: "spring", duration: 1.2 },
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", duration: 0.5 },
                    }}
                    exit={{
                      x:"-50vw",
                      scale:[1,0],
                      transition:{duration:1},
                      backgroundColor: "red",
                    }}
                    
                  >
                    <div className="todolistItem">
                      <h3>{item.Title}</h3>
                      <p>{item.Description}</p>
                    </div>
                    <div className="iconBtn">
                      <motion.div
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <RxCross2
                          className="icon"
                          onClick={() => {
                            handelDeleteTodos(index);
                          }}
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IoCheckmarkDoneSharp
                          className="checkIcon"
                          onClick={() => {
                            handelcompletetodos(index);
                          }}
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <CiEdit
                          className="editIcon"
                          onClick={() => {
                            handelEdittodos(index, item);
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                ); 
              }
            })}</AnimatePresence>
            <AnimatePresence>
          {completeScreen === true &&
            allCompleteTodos.map((item, index) => {
              return (
               
                <motion.div
                  className="todoListArea"
                  key={index}
                  initial={{
                    x: "150vw",
                    transition: { type: "spring", duration: 1.2 },
                  }}
                  animate={{
                    x: 0,
                    transition: { type: "spring", duration: 1.2 },
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { type: "spring", duration: 0.5 },
                  }}
                  exit={{
                    x:"-50vw",
                    scale:[1,0],
                    transition:{duration:1},
                    backgroundColor: "red",
                  }}
                  
                >
                  <div className="todolistItem">
                    <h3>{item.Title}</h3>
                    <p>{item.Description}</p>
                    <p>
                      <small>Complete On: {item.completeOn}</small>
                    </p>
                  </div>
                  <motion.div className="icon" >
                    <RxCross2
                      className=" deleteicon"
                     
                      onClick={() => {
                        handelDeleteCompleteTodos(index);
                      }}
                    />
                  </motion.div>
                </motion.div>
                
              );
            })}</AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Mytodo;
