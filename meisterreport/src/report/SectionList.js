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
        const orderedSectionsList = this.sectionsList.sort(function(a, b) {
            if (a.sequence > b.sequence) {
              return 1;
            }
            if (a.sequence < b.sequence) {
              return -1;
            }
            return 0;
          });

        return (
            <div id="accordion" className="sectionlist">
                {orderedSectionsList.map(sectionEntry => <Section key={sectionEntry.id} token={this.token} host={this.host} section={sectionEntry} /> )}
            </div>
        );
    }
}


export default SectionList; 