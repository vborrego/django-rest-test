import React from 'react';
import { pubSubResource, backendService, sessionService, Constants, LoginResult } from './lib';

interface LoginState {
    title: string;
    user: string;
    password: string;
    visible: boolean;
}

interface LoginProps {
    title: string;
}

export default class Login extends React.Component<LoginProps, LoginState> {
    myRef: any;

    constructor(props: LoginProps) {
        super(props);
        this.state = { title: this.props.title, user: Constants.EMPTY_STRING, password: Constants.EMPTY_STRING, visible: true };
        this.myRef = React.createRef();
        pubSubResource.addListener(this.onMessage.bind(this));
    }

    componentDidMount() {
        // called after the 1st render !
        console.log("Login component first render");
    }

    componentWillUnmount() {
        // component will be destroyed
        console.log("Login component will be destroyed soon");
    }

    public loginHandler() {
        sessionService.setUser(Constants.EMPTY_STRING);
        sessionService.setPassword(Constants.EMPTY_STRING);

        backendService.getHelloWorld((data: LoginResult) => {

            if (data.error == null) {
                sessionService.setUser(this.state.user);
                sessionService.setPassword(this.state.password);
                let state: LoginState = this.state;
                state.visible = false;
                state.user = Constants.EMPTY_STRING;
                state.password = Constants.EMPTY_STRING;
                this.setState(state);

                pubSubResource.notify("ShowMenuTask");
                pubSubResource.notify("ShowMenuLogout");
            } else {
                sessionService.setUser(Constants.EMPTY_STRING);
                sessionService.setPassword(Constants.EMPTY_STRING);
            }
        }, this.state.user, this.state.password);
    }

    public handleChange(event: any) {
        let state: LoginState = this.state;

        if (event.target.name == "user") {
            state.user = event.target.value;
        }

        if (event.target.name == "password") {
            state.password = event.target.value;
        }

        this.setState(state);
    }

    public onMessage(message: string): void {
        if (message == "ShowLogin") {
            let state: LoginState = this.state;
            state.visible = true;
            this.setState(state);
        }
    }

    public render() {
        // do not call set state in render !
        if (this.state.visible == false) {
            return null;
        }

        return (
            <div className="card border-default space" ref={this.myRef}>
                <div className="card-header">
                    <h3 className="panel-title">{this.state.title}</h3>
                </div>
                <div className="card-body text-default">
                    <input value={this.state.user} type="text" name="user" className="form-control space" placeholder="user" onChange={this.handleChange.bind(this)} />
                    <input value={this.state.password} type="password" name="password" className="form-control space" placeholder="password" onChange={this.handleChange.bind(this)} />
                    <input type="submit" value="Login" className="btn btn-primary btn-block button" onClick={() => { this.loginHandler(); }} />
                </div>
            </div>
        );
    }
}
