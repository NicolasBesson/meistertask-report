import React from 'react';

import { AppContext } from '../context/Context';
import "./AppConfig.css";

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
                        <div className="wrapper fadeInDown">
                        <div id="formContent">
                            
                            <div className="fadeIn first">
                            <img src="./assets/settings.svg" id="icon" alt="User Icon" height="60" width="60" />
                            </div>

                            <form>
                            <input type="text" id="tokenValue" className="fadeIn second" name="securityToken" placeholder="Jeton de sécurité" required onChange={this.handleTokenChange}/>
                            <input type="text" id="poject" className="fadeIn third" name="projectID" placeholder="Numéro de projet" required onChange={this.handleProjectChange}/>
                            <input type="submit" className="fadeIn fourth" value="Valider" onClick={this.handleSubmitClick}/>
                            </form>

                            <div id="formFooter">
                            <a className="underlineHover" href="https://github.com/NicolasBesson/meistertask-report/blob/master/doc/configuration.md">Paramètres oubliés?</a>
                            </div>

                        </div>
                        </div>
                    )}
                </AppContext.Consumer>
            </div>
        );
    }
}

AppConfig.contextType = AppContext;
export default AppConfig;