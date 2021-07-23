import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // uses App.tsx
import { Constants } from './lib';
import Login from './Login';
import NavBar from './NavBar';
import NavItem from './NavItem';
import Task from './Task';


let appContainer: Element = document.querySelector('#app');
let markup: JSX.Element = <App title={Constants.EMPTY_STRING}>
    <Login title="Login" />
    <Task id="task" title="Task" visible={Constants.FALSE} />
</App>;
ReactDOM.render(markup, appContainer);

let navItemsContainer: Element = document.querySelector('#navbarSupportedContent');
let markUpNavItems: JSX.Element = <NavBar>
    <NavItem id="menuTask" title="Task" visible={Constants.FALSE} />
    <NavItem id="logout" title="Logout" visible={Constants.FALSE} />
</NavBar>
ReactDOM.render(markUpNavItems, navItemsContainer, () => {
    let brand: Element = document.querySelector(".navbar-brand");
    brand.textContent = "Django REST test";
});
