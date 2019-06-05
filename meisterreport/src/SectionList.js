import React from 'react';
import Section from './Section';


class SectionList extends React.Component {
    constructor(props) {
        super(props);
        this.host = props.host;
        this.token = props.token;
        this.sectionsList = props.sectionsList;
    }

    render() {
        return (
            <div id="accordion" className="sectionlist">
                {this.sectionsList.map(sectionEntry => <Section key={sectionEntry.id} token={this.token} host={this.host} section={sectionEntry} /> )}
            </div>
        );
    }
}


export default SectionList; 