import React, { Component } from "react";
import "./App.css";
import { Card } from 'bootstrap';

import SectionList from "./SectionList";
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

    this.state = {};
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

  getTasks(token, project_id) {
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

  getPersons(token, project_id) {
    return fetch(
      "https://" +
      this.host +
      "/api/projects/" +
      project_id +
      "/persons",
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
    this.getTasks(this.token, this.project_id)
      .then(response => {
        this.setState({ tasksList: response });
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
  }

  render() {
    if (
      !this.state.projectList ||
      !this.state.sectionsList ||
      !this.state.tasksList ||
      !this.state.personsList
    ) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div className="container">
          <div>Compte rendu de tâches</div>

          <SectionList
            taskList={this.state.tasksList}
            sections={this.state.sectionsList}
            persons={this.state.personsList}
          />
        </div>
      );
    }
  }
}

export default App;
