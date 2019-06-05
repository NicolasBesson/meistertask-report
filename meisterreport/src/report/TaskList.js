import React from 'react';
import Task from './Task';

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.host = props.host;
        this.token = props.token;
        this.tasks = props.tasks;
    }

    getPersons(token) {
        return fetch(
            "https://" + this.host + "/api/persons",
            {
                method: "GET",
                Host: this.host,
                //mode: "no-cors",
                headers: {
                    Accept: "*/*",
                    //"Authorization": "Bearer " + token,
                    Authorization: "Bearer " + token,
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }
            }
        ).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log("error");
            }
        });
    }

    componentDidMount() {
        this.getPersons(this.token)
            .then(response => {
                this.setState({ personsList: response });
            })
            .catch(err => {
                console.log(err);
            });
    }

    assignedPerson(tasks, persons)
    {
        tasks.forEach(task => {
            const person = persons.find(person => person.id === task.assigned_to_id);
            if (person && person.firstname && person.lastname)
            {
                task.contact = person.firstname + " " + person.lastname;
                task.contact_email = person.email;
            } 
            else if (person)
            {
                task.contact = person.email;
                task.contact_email = person.email;
            }
            else
            {
                task.contact = "Non Affecté";
                task.contact_email = ".";
            }
        });
        return tasks;
    }

    render() {
        if (!this.state.personsList) {
            return (
                <div>Loading tasks ....</div>
            );
        }
        else {
            // Assign person to task
            let tasks = this.assignedPerson(this.tasks, this.state.personsList);

            return (
                <div>
                    {tasks.map(task => <Task key={task.id} task={task} token={this.token} host={this.host}/>)}
                </div>
            );
        }
    }
}


export default TaskList; 