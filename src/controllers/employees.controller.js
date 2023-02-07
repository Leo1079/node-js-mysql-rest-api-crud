import { pool } from "../db.js";

export const employeesGet = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from employee");
    res.json(rows);
  } catch (e) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from employee where id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0) {
      res.status(404).json({
        message: "employee not found",
      });
    }
    res.json(rows[0]);
  } catch (e) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};

export const createEmployee = async (req, res) => {

  
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employee(name,salary) VALUES (?,?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (e) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary )  where id = ?",
      [name, salary, id]
    );
    console.log(result);
    if (result.affectedRows <= 0) {
      res.status(404).json({
        message: "not found employee",
      });
    }

    const [rows] = await pool.query("SELECT * from employee WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (e) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};

export const employeeDel = async (req, res) => {
  try {
    const [result] = await pool.query("delete from employee where id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0) {
      res.status(404).json({
        message: "the employee does not exist",
      });
    }
    res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};
