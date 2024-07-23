import { TaskController } from "../controller/taskHttpController";
import { ManageTask } from "../adapters/manageTask";
import { HttpResponse } from "../../../shared/response/httpResponse";
import { TaskServiceInteractor } from "../../application/services/taskService";

export const controlInjection = ():TaskController => {
    const statusRepository : HttpResponse = new HttpResponse();
    const manageTask: ManageTask = new ManageTask();
    const taskService: TaskServiceInteractor = new TaskServiceInteractor(manageTask);
    const taskControl: TaskController = new TaskController(taskService, statusRepository);
    return taskControl;
}