// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import algoModel from "../db/algo.ts";

// Middleware para validar los datos del cuerpo de la solicitud
const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, Trabajadores } = req.body;
  if (!name || !Trabajadores) {
    res.status(400).send("Name  are required");
    return;
  }
  if (name > 10) {
    res.status(400).send("");
    return;
  }
  next();
};

// Middleware para manejar errores
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
};

const addalgo = async (
  req: Request,
  res: Response,
) => {
  try {
    // Validar los datos del cuerpo de la solicitud antes de realizar la operación
    validateRequestBody(req, res, () => {});

    const { name, Trabajadores } = req.body;

    const alreadyExists = await algoModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Empresa already exists");
      return;
    }

    const newalgo = new algoModel({ name, Trabajadores });
    await newalgo.save();

    res.status(200).send({
      name: newalgo.name,
    });
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};

export default addalgo;
