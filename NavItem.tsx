import React from 'react';
import { pubSubResource, Constants, sessionService } from './lib';

interface NavItemState {
    title: string;
    visible: string;
}

interface NavItemProps {
    title: string;
    id: string;
    visible: string;
}

export default class NavItem extends React.Component<NavItemProps, NavItemState> {
    id: string;

    constructor(props: NavItemProps) {
        super(props);
        this.state = { title: this.props.title, visible: this.props.visible };
        this.id = this.props.id;
        pubSubResource.addListener(this.onMessage.bind(this));
    }

    public onMessage(message: string): void {
        if (message == "ShowMenuTask") {
            let menuTask: Element = document.querySelector("#menuTask");
            menuTask.setAttribute("style", "display:block;");
        }

        if (message == "ShowMenuLogout") {
            let menuLogout: Element = document.querySelector("#logout");
            menuLogout.setAttribute("style", "display:block;");
        }

        if (message == "HideMenuTask") {
            let menuTask: Element = document.querySelector("#menuTask");
            menuTask.setAttribute("style", "display:none;");
        }

        if (message == "HideMenuLogout") {
            let menuLogout: Element = document.querySelector("#logout");
            menuLogout.setAttribute("style", "display:none;");
        }

    }


    componentDidMount() {
        // called after the 1st render !
        console.log("NavItem component first render");
    }

    componentWillUnmount() {
        // component will be destroyed
        console.log("NavItem component will be destroyed soon");
    }

    public clickHandler() {
        console.log("Clicked navitem " + this.id);

        if (this.id == "menuTask") {
            pubSubResource.notify("ShowTask");
        }

        if (this.id == "logout") {
            pubSubResource.notify("HideMenuTask");
            pubSubResource.notify("HideMenuLogout");
            pubSubResource.notify("ShowLogin");
            pubSubResource.notify("HideTask");
            sessionService.setUser(Constants.EMPTY_STRING);
            sessionService.setPassword(Constants.EMPTY_STRING);
        }
    }

    public render() {
        // do not call set state in render !
        if (this.state.visible == Constants.FALSE) {
            return <li className="nav-item" style={{ display: "none" }} id={this.id} onClick={() => { this.clickHandler(); }} >
                <a className="nav-link" href="#">{this.state.title}</a>
            </li>;
        }

        return (
            <li className="nav-item" style={{ display: "block" }} id={this.id} onClick={() => { this.clickHandler(); }} >
                <a className="nav-link" href="#">{this.state.title}</a>
            </li>
        );
    }
}