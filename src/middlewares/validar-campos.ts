import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const ValidarCampos = (request: Request, response: Response, next: NextFunction) => {
    const err = validationResult(request);

    if (!err.isEmpty()) return response.status(400).json({
        ok: false,
        errors: err.mapped()
    });

    next();
}