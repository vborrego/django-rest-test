import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface AddTaskResult {
    addedTask: boolean;
}

interface TaskItem {
    id: number,
    task: string,
    created: string
}

interface GetTasksResult {
    error: string,
    count: number,
    next: number,
    previous: number,
    results: TaskItem[]
}

class Constants {
    static readonly BASE_URL = "http://localhost:8001";
    static readonly EMPTY_STRING = "";
    static readonly TRUE = "true";
    static readonly FALSE = "false";
}


interface LoginResult {
    error: string;
    user: string;
    message: string;
}

class SessionService {
    public setUser(user: string) {
        window.sessionStorage.setItem("user", user);
    }

    public setPassword(password: string) {
        window.sessionStorage.setItem("password", password);
    }

    public getUser() {
        return window.sessionStorage.getItem("user");
    }

    public getPassword() {
        return window.sessionStorage.getItem("password");
    }
}


class BackendService {
    public getHelloWorldAnon(callback: Function) {
        axios.get(Constants.BASE_URL + '/helloworld/')
            .then((res: AxiosResponse<any>) => {
                callback(res.data);
            })
    }

    public getHelloWorld(callback: Function, user: string, password: string) {
        let config: AxiosRequestConfig = {};
        config.auth = { username: user, password: password };

        axios.get(Constants.BASE_URL + '/helloworld/', config)
            .then((res: AxiosResponse<any>) => {
                let loginResult: LoginResult = { error: null, user: res.data["user"], message: res.data["message"] };

                callback(loginResult)
            }).catch((res: any) => {
                let loginResult: LoginResult = { error: "Login error. Check credentials !", user: null, message: null };
                callback(loginResult);
            });
    }

    public addTask(task: string, callback: Function) {
        let config: AxiosRequestConfig = {};
        config.auth = { username: sessionService.getUser(), password: sessionService.getPassword() };

        axios.post(Constants.BASE_URL + '/tasks/', { "task": task }, config)
            .then((res: AxiosResponse<any>) => {
                callback(res)
            }).catch((res: any) => {
                callback(res);
            });
    }

    public getTasks(callback: Function) {
        let config: AxiosRequestConfig = {};
        config.auth = { username: sessionService.getUser(), password: sessionService.getPassword() };

        axios.get(Constants.BASE_URL + '/tasks/', config)
            .then((res: AxiosResponse<any>) => {
                let gtr: GetTasksResult = { error: null, count: res.data["count"], next: null, previous: null, results: res.data["results"] }
                callback(gtr)
            }).catch((res: any) => {
                let gtr: GetTasksResult = { error: "Get tasks error.", count: null, next: null, previous: null, results: null };
                callback(gtr);
            });

    }

    public cancelTask(taskId: string, callback: Function) {
        let config: AxiosRequestConfig = {};
        config.auth = { username: sessionService.getUser(), password: sessionService.getPassword() };

        axios.patch(Constants.BASE_URL + '/tasks/' + taskId + '/', { "taskId": taskId, "state": "CANCELLED" }, config)
            .then((res: AxiosResponse<any>) => {
                callback(res)
            }).catch((res: any) => {
                callback(res);
            });
    }

    public doneTask(taskId: string, callback: Function) {
        let config: AxiosRequestConfig = {};
        config.auth = { username: sessionService.getUser(), password: sessionService.getPassword() };

        axios.patch(Constants.BASE_URL + '/tasks/' + taskId + '/', { "taskId": taskId, "state": "DONE" }, config)
            .then((res: AxiosResponse<any>) => {
                callback(res)
            }).catch((res: any) => {
                callback(res);
            });
    }
}

class PubSub {
    callbacks: Function[];

    constructor() {
        this.callbacks = [];
    }

    addListener(fn: Function): void {
        this.callbacks.push(fn);
    }

    notify(message: string): void {
        this.callbacks.forEach((fn) => {
            fn(message);
        });
    }
}
let pubSubResource = new PubSub();
let backendService = new BackendService();
let sessionService = new SessionService();

export { TaskItem, GetTasksResult, AddTaskResult, Constants, LoginResult, pubSubResource, backendService, sessionService }