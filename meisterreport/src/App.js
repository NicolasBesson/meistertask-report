import React, { Component } from "react";
import "./App.css";
import { AppContext, options } from './Context';

import SectionList from "./SectionList";
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

/*
const taskslist = [
  {
    id: 41310705,
    token: "m7OTmGLH",
    name: "Présence extincteurs dans parties communes et réglementation",
    notes: "**2019-03-21** Visite de dessautel",
    notes_html: "<p><strong>2019-03-21</strong> Visite de dessautel</p>\n",
    status: 1,
    status_updated_at: "2019-02-06T10:05:43.276178Z",
    section_id: 11593834,
    sequence: 7,
    assigned_to_id: null,
    due: null,
    created_at: "2019-02-06T10:05:43.276413Z",
    updated_at: "2019-03-21T08:56:01.047926Z"
  }
*/
/*
const sectionsList = [
  {
    id: 11593834,
    name: "A aborder",
    description: null,
    color: "30bfbf",
    status: 1,
    project_id: 3130620,
    sequence: -1,
    created_at: "2019-01-30T12:29:52.442870Z",
    updated_at: "2019-02-01T08:27:39.218709Z"
  }*/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: options.followup
    };

    this.asReport = this.asReport.bind(this);
    this.asAgenda = this.asAgenda.bind(this);
    this.asFollowUp = this.asFollowUp.bind(this);
  }

  getProjects(token) {
    return fetch("https://" + this.host + "/api/projects?status=active", {
      method: "GET",
      Host: this.host,
      //mode: "no-cors",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log("error");
      }
    });
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

  getTasksOpened(token, project_id) {
    return fetch(
      "https://" +
      this.host +
      "/api/projects/" +
      project_id +
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

  getTasksCompleted(token, project_id) {
    return fetch(
      "https://" +
      this.host +
      "/api/projects/" +
      project_id +
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

  getComments(token, task_id) {
    return fetch(
      "https://" +
      this.host +
      "/api/tasks//" +
      task_id +
      "/comments",
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

  getPersons(token, project_id) {
    return fetch(
      "https://" + this.host + "/api/projects/" + project_id + "/persons",
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

  componentWillMount() {
    this.token =
      "5091adbec66a04504a4d48ea479301a38a701b08427f8a54f54577c717e36d4b";
    this.host = "www.meistertask.com";
    this.project_id = "3130620";
  }

  componentDidMount() {
    this.getProjects(this.token)
      .then(response => {
        this.setState({ projectList: response });
      })
      .catch(err => {
        console.log(err);
      });
    this.getSections(this.token, this.project_id)
      .then(response => {
        this.setState({ sectionsList: response });
      })
      .catch(err => {
        console.log(err);
      });
    this.getTasksOpened(this.token, this.project_id)
      .then(response => {
        this.setState({ tasksList: response });
      })
      .catch(err => {
        console.log(err);
      });
    this.getTasksCompleted(this.token, this.project_id)
      .then(response => {
        this.setState({ tasksListCompleted: response });
      })
      .catch(err => {
        console.log(err);
      });
    this.getPersons(this.token, this.project_id)
      .then(response => {
        this.setState({ personsList: response });
      })
      .catch(err => {
        console.log(err);
      });
    //this.setState({option: options.agenda});
  }

  asReport() {
    this.context.mode = options.report;
    this.setState({ mode: options.report });
  }

  asAgenda() {
    this.context.mode = options.agenda;
    this.setState({ mode: options.agenda });
  }

  asFollowUp() {
    this.context.mode = options.followup;
    this.setState({ mode: options.followup });
  }


  render() {
    if (
      !this.state.projectList ||
      !this.state.sectionsList ||
      !this.state.tasksList ||
      !this.state.tasksListCompleted ||
      !this.state.personsList
    ) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div>
          <div>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary" onClick={this.asReport}>Rapport</Button>
              <Button variant="secondary" onClick={this.asAgenda}>Ordre du jour</Button>
              <Button variant="secondary" onClick={this.asFollowUp}>Avancement</Button>
            </ButtonGroup>
          </div>
          <AppContext.Provider value={this.state.mode}>
            <div className="jumbotron jumbotron-fluid title">
              <AppContext.Consumer>
                {({ title }) => (
                  <div className="container">
                    <h1>{title}</h1>
                  </div>
                )}
              </AppContext.Consumer>
            </div>
            <div className="container">
              <SectionList
                taskList={this.state.tasksList.concat(this.state.tasksListCompleted)}
                sections={this.state.sectionsList}
                persons={this.state.personsList}
              />
            </div>
          </AppContext.Provider>
        </div>
      );
    }
  }
}
App.contextType = AppContext;
export default App;
