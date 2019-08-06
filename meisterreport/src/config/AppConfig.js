import React from 'react';

import { AppContext } from '../context/Context';

class AppConfig extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
      this.handleTokenChange = this.handleTokenChange.bind(this);
      this.handleProjectChange = this.handleProjectChange.bind(this);
      this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    
    componentWillMount() {
        
    }

    handleTokenChange(event) {
        this.setState({token: event.target.value})
    }

    handleProjectChange(event) {
        this.setState({projectID: event.target.value})
    }


    handleSubmitClick(event) {
        //this.setState({isValidToken: true});
        this.context.setTokenAndProject(this.state.token, this.state.projectID)
    }


    render ()
    {
        return (
            <div>
                <AppContext.Consumer>
                    {({token, projectID}) => (
                    <form>
                        <div>
                            <label>Jeton de sécurité</label>
                            <input id="tokenValue" name="securityToken" defaultValue={token} required onChange={this.handleTokenChange}/>
                        </div>
                        <div>
                            <label>Numéro de projet</label>
                            <input id="poject" name="projectID" defaultValue={projectID} required onChange={this.handleProjectChange}/>
                        </div>
                        <div>
                            <button onClick={this.handleSubmitClick}>Valider</button>
                        </div>
                    </form>
                    )}
                </AppContext.Consumer>
            </div>
        );
    }
}

AppConfig.contextType = AppContext;
export default AppConfig;