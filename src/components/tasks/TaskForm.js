import React, { useState, useRef } from 'react';
import classes from './TaskForm.module.css';

const Taskform = (props) => {
  const TaskDetailsRef = useRef();
  const TaskEndTimeRef = useRef();
  const [isValid, setIsValid] = useState(true);

  // Responseble For Appending Inputs Data To POST It In Fire Base
  const submitHandeler = (e) => {
    e.preventDefault();

    const EnteredDetails = TaskDetailsRef.current.value;
    const EnteredEndTime = TaskEndTimeRef.current.value;
    const randomNum = Math.round(Math.random() * 10000);

    if (EnteredDetails === '' || EnteredEndTime === '') {
      setIsValid(false);
      return;
    } else {
      setIsValid(true);
    }
    const TasksInputs = {
      taskDetails: EnteredDetails,
      taskEndDate: EnteredEndTime,
      taskId: randomNum,
    };

    props.onAddTask(TasksInputs);

    // Thats Not A good WAY TO RESET THE BECAUSE IT'S MANIBULATE THE VALUE (( STATE IS BETTER )) BUT IT'S A DEMO !!
    TaskDetailsRef.current.value = '';
    TaskEndTimeRef.current.value = '';
  };

  return (
    <>
      <section className={classes.auth}>
        <h1>Enter Your Tasks</h1>
        <form onSubmit={submitHandeler}>
          <div className={classes.control}>
            <label>Task Details</label>
            <textarea ref={TaskDetailsRef} />
          </div>
          <div className={classes.control}>
            <label>Task End Time</label>
            <input ref={TaskEndTimeRef} />
          </div>
          <div className={classes.actions}>
            <button onSubmit={submitHandeler}>Submit Your Task</button>
          </div>
          {!isValid && (
            <p
              style={{
                marginTop: '15px',
                color: 'darkred',
                border: '3px solid darkred',
                fontWeight: 'bold',
              }}
            >
              YOU MUST FILL BOTH FIELDS
            </p>
          )}
        </form>
      </section>
    </>
  );
};

export default Taskform;
