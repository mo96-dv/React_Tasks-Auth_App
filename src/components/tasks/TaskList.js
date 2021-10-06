import React from 'react';
import classes from './Task.module.css';
import TaskRender from './TaskRender.js';

const TaskList = (props) => {
  // Responsble For Looping The Data That Have POSTED In The Fire Base

  // Appending The Id Another Level Up To The Parent Component {Task.js}
  const deleteMe = (id) => {
    props.onDeleteMe(id);
  };
  return (
    <ul className={classes.container}>
      {props.taskGetted.map((task) => (
        <TaskRender
          onDelete={deleteMe}
          title={task.title}
          date={task.date}
          id={task.id}
          key={task.id}
        />
      ))}
    </ul>
  );
};

export default TaskList;
