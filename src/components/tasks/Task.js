import React, { useState } from 'react';
import classes from './Task.module.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Task = () => {
  const [taskDetails, setTaskDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  // MAKING OUR REALTIME DATA BASE URL CONSTANT

  const url =
    'https://second-demo-auth-post-get-default-rtdb.firebaseio.com/Task.json';

  // POSTING REQUEST:

  const posting = async (TasksInputs) => {
    setSending(true);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TasksInputs),
    });

    if (response.ok) {
      setSending(false);
      setIsSubmited('success');
      setTimeout(() => {
        setIsSubmited('');
      }, 1500);
    } else {
      setSending(true);
      setIsSubmited('Faild');
    }
    // const data = await response.json();
    // console.log(data);
  };

  // GET REQUEST:
  // And Pass It Into { TaskList.js } To Looping Throw It And Show It In Client Side

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Somthing Went Wrong');
      }
      const data = await response.json();

      const gettedData = [];

      for (const key in data) {
        gettedData.push({
          title: data[key].taskDetails,
          date: data[key].taskEndDate,
          id: data[key].taskId,
        });
      }
      setTaskDetails(gettedData);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  // HANDLING THE DELETE METHOD (( NOT FROM THE DATA BASE !!))

  const deleteHandeler = async (id) => {
    const FilteredTasks = taskDetails.filter((task) => task.id !== id);
    setTaskDetails(FilteredTasks);
  };

  // Handling Errors And Loading Status
  let listContent;
  let formContent;

  if (taskDetails.length > 0) {
    listContent = (
      <TaskList onDeleteMe={deleteHandeler} taskGetted={taskDetails} />
    );
  }
  if (taskDetails.length === 0) {
    listContent = <p className={classes.section}>Found No Tasks</p>;
  }

  if (error) {
    listContent = <p className={classes.section}>Some Thing Went Wrong</p>;
  }
  if (isLoading) {
    listContent = <p className={classes.section}>Loading...</p>;
  }
  if (sending) {
    formContent = (
      <p
        style={{
          textAlign: 'center',
          color: 'darkgoldenrod',
          fontSize: '23px',
          fontWeight: 'bold',
        }}
        className={classes.section}
      >
        Wait A Moment...
      </p>
    );
  }
  return (
    <>
      <section>
        <TaskForm onAddTask={posting} />
        {formContent}
        <p
          style={{
            textAlign: 'center',
            color: 'seagreen',
            fontSize: '23px',
            fontWeight: 'bold',
          }}
        >
          {isSubmited}
        </p>
      </section>
      <section className={classes.section}>
        <button className={classes.btn} onClick={getData}>
          Get My Data
        </button>
      </section>
      <section>{listContent}</section>
    </>
  );
};

export default Task;
