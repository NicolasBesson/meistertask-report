import React from "react";


export const options =
{
    report: {
        title: "Compte rendu de réunion",
        edit_icon: true,
        task_details: false
    },
    agenda: {
        title: "Ordre du jour",
        edit_icon: false,
        task_details: false
    },
    followup: {
        title: "Suivi d'activités",
        edit_icon: true,
        task_details: true
    }
}
export const AppContext = React.createContext(
    { mode: options.followup }
);
