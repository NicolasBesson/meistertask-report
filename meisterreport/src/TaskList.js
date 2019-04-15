import React from 'react';
import Task from './Task';

function TaskList(props) {
    return (
        <div>
            {props.tasks.map(task => <Task task={task}/>)}
        </div>
    );
};

export default TaskList; 