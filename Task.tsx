import React from 'react';
import { pubSubResource, backendService, AddTaskResult, Constants, GetTasksResult, TaskItem } from './lib';

interface TaskState {
    title: string;
    task: string;
    visible: string;
    tasks: any;
}

interface TaskProps {
    title: string;
    visible: string;
    id: string;
}

export default class Task extends React.Component<TaskProps, TaskState> {


    constructor(props: TaskProps) {
        super(props);
        this.state = { title: this.props.title, task: Constants.EMPTY_STRING, visible: this.props.visible, tasks: [] };
        pubSubResource.addListener(this.onMessage.bind(this));
    }

    componentDidMount() {
        // called after the 1st render !
    }

    componentWillUnmount() {
        // component will be destroyed
    }

    public addTaskClicked() {
        backendService.addTask(this.state.task, (res: AddTaskResult) => {
            pubSubResource.notify("ShowTask");
        });
    }

    deleteClicked(evt: any) {
        backendService.cancelTask(evt.target.value, (res: any) => {
            pubSubResource.notify("ShowTask");
        });
    }

    doneClicked(evt: any) {
        backendService.doneTask(evt.target.value, (res: any) => {
            pubSubResource.notify("ShowTask");
        });
    }

    public handleChange(event: any) {
        let state: TaskState = this.state;

        if (event.target.name == "task") {
            state.task = event.target.value;
        }

        this.setState(state);
    }

    public onMessage(message: string): void {
        if (message == "ShowTask") {
            backendService.getTasks((res: GetTasksResult) => {
                console.log(res);
                let state: TaskState = this.state;
                state.visible = Constants.TRUE;
                state.tasks = [];

                for (let index: number = 0; index < res.count; index++) {
                    let value: TaskItem = res.results[index];
                    state.tasks.push([value.id, value.task]);
                }

                state.task = Constants.EMPTY_STRING;
                this.setState(state);
            });
        }

        if (message == "HideTask") {
            let state: TaskState = this.state;
            state.visible = Constants.FALSE;
            this.setState(state);
        }
    }

    public render() {
        // do not call set state in render !
        if (this.state.visible == Constants.FALSE) {
            return null;
        }

        return (
            <div className="card border-default space" id={this.props.id}>
                <div className="card-header">
                    <h3 className="panel-title">{this.state.title}</h3>
                </div>
                <div className="card-body text-default">
                    <div className="itemTask space-bottom">
                        <input value={this.state.task} type="text" name="task" className="form-control space" placeholder="task" onChange={this.handleChange.bind(this)} />
                        <input type="submit" value="Add task" className="btn btn-primary space-bottom button" onClick={() => { this.addTaskClicked(); }} />
                    </div>
                    {this.state.tasks.map((item: any) =>
                        <div className="itemTask space-bottom">
                            <div className="taskName">{item[1]}</div>
                            <div className="taskDelete">
                                <button className="btn btn-primary fa fa-submit" name="delete" value={item[0]} type="button" onClick={(evt) => { this.deleteClicked(evt); }}>&#xf1f8;</button>
                            </div>
                            <div className="taskDone">
                                <button className="btn btn-primary fa fa-submit" name="done" value={item[0]} type="button" onClick={(evt) => { this.doneClicked(evt); }}>&#xf00c;</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}