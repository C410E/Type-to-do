import React, { useState } from 'react';

import styles from "./App.module.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Taskform from './components/Taskform';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import { ITask } from './interfaces/Task';

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
      setTaskList(
        taskList.filter(task => {
          return task.id !== id
        })
        )
  }
  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if (display) {
     modal!.classList.remove("hide")
    } else {
    modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask):void => {
    hideOrShowModal(true);
    setTaskToUpdate(task)
  }
  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask =  {id, title, difficulty}

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItems)
    hideOrShowModal(false)
  }

  return (
    <div >
        <Modal  
        children={<Taskform btnText="Editar tarefa" taskList={taskList}  task={taskToUpdate}/>}
       />
        <Header />
        <main className={styles.main}>
           <h1>Anote suas tarefas</h1>
           <div>
             <Taskform 
              btnText="Criar tarefa" 
              taskList={taskList} 
              setTaskList={setTaskList}
              /* handleUpdate={updateTask}*/
              />
             
           </div>
           <div>
            <h2>suas Tarefas:</h2>
            <TaskList 
            taskList={taskList} 
            handleDelete={deleteTask}
            handleEdit={editTask}
            />
           </div>
          </div>
        </main>
       
        <Footer />
    </div>
  );
}

export default App;
