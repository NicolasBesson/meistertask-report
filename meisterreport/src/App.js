import React, { Component } from "react";
import "./App.css";
import { AppContext, options } from './context/Context';

import AppConfig from "./config/AppConfig";
import Report from "./report/Report";
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: options.followup,
      isConfigured: false,
      token: 0,
      projectID: 0,
      setTokenAndProject: (tokenValue, projectIDValue) => { localStorage.setItem("access-token", tokenValue);
                                                            localStorage.setItem("project-id", projectIDValue);
                                                            this.setState({token: tokenValue, projectID: projectIDValue, isConfigured: true});
                                                          }
    };

    this.asReport = this.asReport.bind(this);
    this.asAgenda = this.asAgenda.bind(this);
    this.asFollowUp = this.asFollowUp.bind(this);
    this.asActionReport = this.asActionReport.bind(this);
    this.handleClearSettings = this.handleClearSettings.bind(this);
    this.handleForcePageReload = this.handleForcePageReload.bind(this);
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

  componentWillMount() {
    this.host = "www.meistertask.com";

    this.handleLoadSettings();

  }

  componentDidMount() {

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

  asActionReport() {
    this.context.mode = options.actionreport;
    this.setState({ mode: options.actionreport });
  }

  handleLoadSettings() {
    const tokenValue = localStorage.getItem("access-token");
    const projectIDValue = localStorage.getItem("project-id");
    
    if (projectIDValue === null || 
        tokenValue === null) {
      this.setState({isConfigured: false})
    }
    else {
      this.setState({projectID: projectIDValue})
      this.setState({token: tokenValue})
      this.setState({isConfigured: true})
    }
  }

  handleClearSettings() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("project-id");
    this.setState({isConfigured: false});
  }

  handleForcePageReload() {
    document.location.reload(true);
  }

  render() {
    if (this.state.isConfigured === false)
    {
      return (
          <AppContext.Provider value={this.state}>
            <AppConfig />
          </AppContext.Provider>
      );
    }
    else {
      return (
        <div>
          <div className="menu">
            <ButtonGroup aria-label="Basic example">
              <Button variant="danger" onClick={() => { if (window.confirm('Voulez vous supprimer les paramètres de configuration ?')) this.handleClearSettings() }}>X</Button>              
              <Button variant="secondary" onClick={this.asReport}>Rapport</Button>
              <Button variant="secondary" onClick={this.asAgenda}>Ordre du jour</Button>
              <Button variant="secondary" onClick={this.asFollowUp}>Avancement</Button>
              <Button variant="secondary" onClick={this.asActionReport}>Retours/Actions</Button>
              <Button variant="success" onClick={this.handleForcePageReload}><img src="./assets/reload.svg"  width="20" height="20"/></Button>
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
              <Report
                host={this.host}
                token={this.state.token}
                projectID={this.state.projectID}
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
