import React from 'react';

interface NavBarState {
}

interface NavBarProps {
  children?: React.ReactNode;
}

export default class NavItem extends React.Component<NavBarProps, NavBarState> {

    constructor(props: NavBarProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // called after the 1st render !
        console.log("NavBar component first render");
    }

    componentWillUnmount() {
        // component will be destroyed
        console.log("NavBar component will be destroyed soon");
    }

    public render() {
        // do not call set state in render !
        let brand: Element = document.querySelector(".navbar-brand");
        brand.textContent = "Django REST test";

        return (
            <ul className="navbar-nav mr-auto" id="nav-items">
                {this.props.children}
            </ul>
        );
    }
}
