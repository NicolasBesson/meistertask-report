import React from 'react';
import SectionList from "./SectionList";

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.host = props.host;
        this.token = props.token;
        this.projectID = props.projectID;
    }

    getSections(token, project_id) {
        return fetch(
            "https://" +
            this.host +
            "/api/projects/" +
            project_id +
            "/sections?status=active",
            {
                method: "GET",
                Host: this.host,
                //mode: "no-cors",
                headers: {
                    Accept: "*/*",
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

    componentWillMount() {

    }

    componentDidMount() {
        this.getSections(this.token, this.projectID)
            .then(response => {
                this.setState({ sectionsList: response });
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        if (!this.state.sectionsList) {
            return (<div className="loading">Loading ...</div>
            );
        }
        else {
            return (
                <div>
                    <SectionList host={this.host} token={this.token} sectionsList={this.state.sectionsList} />
                </div>
            );
        }
    }
}

export default Report;