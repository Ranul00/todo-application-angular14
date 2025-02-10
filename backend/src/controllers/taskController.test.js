const request = require("supertest");
const sinon = require("sinon");
const TaskController = require("../controllers/taskController");

jest.mock("../models/Task", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define("Task", {
    id: 1,
    title: "Mock Task",
    description: "This is a mock task",
    status: false,
    createdAt: new Date(),
  });
});

const Task = require("../models/Task");

describe("Task Controller Unit Tests", () => {
  afterEach(() => {
    sinon.restore();
  });

  //   GET TASKS
  it("should retrieve up to 5 incomplete tasks", async () => {
    const findAllStub = sinon.stub(Task, "findAll").resolves([
      { id: 1, title: "Task 1", status: false },
      { id: 2, title: "Task 2", status: false },
    ]);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await TaskController.getTasks(req, res);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, title: "Task 1", status: false },
      { id: 2, title: "Task 2", status: false },
    ]);
    findAllStub.restore();
  });

  //   POST CREATE TASK
  it("should create a new task", async () => {
    const createStub = sinon.stub(Task, "create").resolves({
      id: 2,
      title: "New Task",
      description: "Task description",
      status: false,
    });

    const req = {
      body: { title: "New Task", description: "Task description" },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await TaskController.createTask(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 2,
      title: "New Task",
      description: "Task description",
      status: false,
    });

    createStub.restore();
  });

  it("should return 400 when title is missing", async () => {
    const req = { body: { description: "Missing title" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await TaskController.createTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Title is required" });
  });

  //   PUT MARK AS COMPLETED
  it("should mark a task as completed", async () => {
    const updateStub = sinon.stub(Task, "update").resolves([1]);
    const findAllStub = sinon.stub(Task, "findAll").resolves([]);

    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await TaskController.markComplete(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Task marked as completed",
      data: [],
    });

    updateStub.restore();
    findAllStub.restore();
  });

  it("should return 404 when marking non-existent task as completed", async () => {
    const updateStub = sinon.stub(Task, "update").resolves([0]);

    const req = { params: { id: 999 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await TaskController.markComplete(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Task not found" });

    updateStub.restore();
  });

  //   DELETE TASK
  it("should delete a task successfully", async () => {
    const destroyStub = sinon.stub(Task, "destroy").resolves(1);
    const findAllStub = sinon.stub(Task, "findAll").resolves([]);

    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await TaskController.deleteTask(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Task deleted successfully",
      data: [],
    });

    destroyStub.restore();
    findAllStub.restore();
  });

  it("should return 404 when deleting non-existent task", async () => {
    const destroyStub = sinon.stub(Task, "destroy").resolves(0);

    const req = { params: { id: 999 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await TaskController.deleteTask(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Task not found" });

    destroyStub.restore();
  });
});
