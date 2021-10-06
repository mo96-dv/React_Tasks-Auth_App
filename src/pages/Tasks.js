import React from 'react';
import Task from '../components/tasks/Task';

const Tasks = () => {
  return (
    <div>
      <p
        style={{
          textAlign: 'center',
          color: 'gray',
          fontSize: '25px',
          margin: '25px',
        }}
      >
        Tasks Page
      </p>
      <Task />
    </div>
  );
};

export default Tasks;
