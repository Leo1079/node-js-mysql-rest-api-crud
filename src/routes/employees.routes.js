import { Router } from "express";
import {
  employeesGet,
  createEmployee,
  updateEmployee,
  employeeDel,
  getEmployee
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees", employeesGet);

router.get("/employees/:id", getEmployee);

router.post("/employees", createEmployee);

router.patch("/employees/:id", updateEmployee);

router.delete("/employees/:id", employeeDel);

export default router;
