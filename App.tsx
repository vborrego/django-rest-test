import React from 'react';
import { pubSubResource } from './lib';

interface AppState {
    title: string;
}

interface AppProps {
    title: string;
    children?: React.ReactNode;
}

export default class App extends React.Component<AppProps, AppState> {
    myRef: any;
    constructor(props: AppProps) {
        super(props);
        this.myRef = React.createRef();
        this.state = { title: this.props.title };
        pubSubResource.addListener(this.onMessage.bind(this));
    }

    componentDidMount() {
        pubSubResource.notify("UpdateTitle Title defined here");
    }

    componentWillUnmount() {
    }

    public render() {
        // do not call set state in render !
        return (
            <div ref={this.myRef}>
                {this.props.children}
                <p className="appTitle">{this.state.title}</p>
            </div>
        );
    }

    public onMessage(message: string): void {
        if (message.startsWith("UpdateTitle ")) {
            let state: AppState = this.state;
            state.title = message.replace("UpdateTitle ", "");
            this.setState(state);
        }
    }
}
