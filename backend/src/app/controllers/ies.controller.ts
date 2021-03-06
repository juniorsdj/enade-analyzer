import express, { Request, Response, Router } from "express";
import { IesService } from "../../domain/ies/ies.service";
import { IController } from "./controller.interface";

export class IesController implements IController {
  private router: Router = express.Router();

  private service: IesService;

  constructor(service: IesService) {
    this.service = service;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/api/ies", this.getIesList);
    this.router.get("/api/questions-theme", this.getQuestionsTheme);
  }

  public getRoutes(): Router {
    return this.router;
  }

  getIesList = async (req: Request, res: Response) => {
    const { uf, cod_ies } = req.query as any;
    const result = await this.service.getIes({
      uf,
      cod_ies,
    });
    res.send(result);
  };
  getQuestionsTheme = async (req: Request, res: Response) => {
    const { ano } = req.query as any;
    //CO_GRUPO de Sistemas de informação
    const CO_GRUPO = 4006;
    const result = await this.service.getQuestionsTheme(ano, CO_GRUPO);
    res.send(result);
  };
}
