import React from 'react';
import Section from './Section';

function buildList(taskList, sections, persons) {
    var sectionList = [];
    sections.forEach(section => {
        var sectionEntry = {};

        sectionEntry.id = section.id;
        sectionEntry.name = section.name;
        sectionEntry.color = section.color;

        const tasks = taskList.filter(task => task.section_id === section.id);

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

        sectionEntry.tasks = tasks;
        
        sectionList.push(sectionEntry);
    });
    
    return sectionList;
}

class SectionList extends React.Component {
    constructor(props) {
        super(props);
        this.sectionList = buildList(props.taskList, props.sections, props.persons);
    }

    render() {
        return (
            <div id="accordion" className="sectionlist">
                {this.sectionList.map(sectionEntry => <Section key={sectionEntry.id} section={sectionEntry} /> )}
            </div>
        );
    }
}


export default SectionList; 