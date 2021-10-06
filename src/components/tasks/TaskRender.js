import React from 'react';
import classes from './Task.module.css';

const TaskRender = (props) => {
  // Responsble For Render The List OF Tasks

  // Appending The Id One Level Up To The Parent Component {TaskList.js} For Delete perposes
  const appendId = () => {
    const id = props.id;
    props.onDelete(id);
  };
  return (
    <li className={classes.task}>
      <div>
        <h2>{props.title}</h2>
        <h3>{props.date}</h3>
      </div>
      <button onClick={appendId} className={classes.btn}>
        DELETE
      </button>
    </li>
  );
};

export default TaskRender;
