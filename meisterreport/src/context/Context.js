import React from "react";


export const options =
{
    report: {
        title: "Compte rendu de réunion",
        edit_icon: false,
        task_details: true,
        show_hide: false
    },
    agenda: {
        title: "Ordre du jour",
        edit_icon: false,
        task_details: false,
        show_hide: false
    },
    followup: {
        title: "Suivi d'activités",
        edit_icon: true,
        task_details: true,
        show_hide: false
    },
    actionreport: {
        title: "Actions et Retours attendus",
        edit_icon: false,
        task_details: true,
        show_hide: true
    }
}
export const AppContext = React.createContext(
    { 
       mode: options.followup,
       isConfigured: false,
       token: 0,
       projectID: 0,
       setTokenAndProject: (tokenValue, projectIDValue) => this.setState({token: tokenValue, projectID: projectIDValue, isConfigured: true})
    }
);
