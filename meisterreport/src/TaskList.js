import React from 'react';
import Task from './Task';

function TaskList(props) {
    return (
        <div id="accordionTask">
            {props.tasks.map(task => <Task task={task}/>)}
        </div>
    );
};

export default TaskList; 