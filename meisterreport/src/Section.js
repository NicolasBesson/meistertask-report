import React from "react";
import TaskList from "./TaskList";

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.host = props.host;
    this.token = props.token;
    this.section = props.section;
  }

  componentDidMount() {
    this.getTasksOpened(this.token, this.section.id)
      .then(response => {
        this.setState({ tasksList: response });
      })
      .catch(err => {
        console.log(err);
      });

    this.getTasksCompleted(this.token, this.section.id)
      .then(response => {
        this.setState({ tasksListCompleted: response });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTasksOpened(token, sectionID) {
    return fetch(
      "https://" +
      this.host +
      "/api/sections/" +
      sectionID +
      "/tasks?status=open",
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

  getTasksCompleted(token, sectionID) {
    return fetch(
      "https://" +
      this.host +
      "/api/sections/" +
      sectionID +
      "/tasks?status=completed",
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

  render() {
    if (!this.state.tasksList ||
        !this.state.tasksListCompleted) {
      return (
        <div className="loading">Loading sections ...</div>
      );
    }
    else {
      let style_section = {
        "fontSize": "150%",
        color: "#" + this.section.color
      };

      let tasksList = this.state.tasksList.concat(this.state.tasksListCompleted);

      return (
        <div className="card section-entry">
          <div
            className="card-header section-card-header"
            id={"heading_" + this.section.id}
          >
            <div style={style_section}>
              {this.section.name}&nbsp;
            <span className="badge badge-info">{tasksList.length}</span>
            </div>
          </div>

          <div className="card-body section-card-body">
            <TaskList token={this.token} host={this.host} tasks={tasksList} />
          </div>
        </div>
      );
    }
  }
}

export default Section;
