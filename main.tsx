import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // uses App.tsx
import { Constants } from './lib';
import Login from './Login';
import NavBar from './NavBar';
import NavItem from './NavItem';
import Task from './Task';
import { createRoot } from 'react-dom/client';

let appContainer: Element = document.querySelector('#app');
let markup:  React.JSX.Element = <App title={Constants.EMPTY_STRING}>
    <Login title="Login" />
    <Task id="task" title="Task" visible={Constants.FALSE} />
</App>;
createRoot(appContainer).render(markup);

let navItemsContainer: Element = document.querySelector('#navbarSupportedContent');
let markUpNavItems:  React.JSX.Element = <NavBar>
    <NavItem id="menuTask" title="Task" visible={Constants.FALSE} />
    <NavItem id="logout" title="Logout" visible={Constants.FALSE} />
</NavBar>
createRoot(navItemsContainer).render(markUpNavItems);

