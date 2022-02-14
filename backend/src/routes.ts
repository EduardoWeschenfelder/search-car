import { Router } from "express";
import axios from "axios";

const routes = Router();

const veiculos: any = [];

routes.get("/", async (req, res) => {
  const { data } = await axios("https://fipe.api.bipcheckout.com/years");
  return res.json(data);
});

routes.get("/:year/marca", async (req, res) => {
  const { year } = req.params;
  const { data } = await axios(
    `https://fipe.api.bipcheckout.com/years/${year}/brands`
  );
  return res.json(data);
});

routes.get("/:year/:marca/modelo", async (req, res) => {
  const { year, marca } = req.params;
  const { data } = await axios(
    `https://fipe.api.bipcheckout.com/years/${year}/brands/${marca}/group_models`
  );
  return res.json(data);
});

routes.get("/:year/:marca/:modelo/versao", async (req, res) => {
  const { year, marca, modelo } = req.params;
  const { data } = await axios(
    `https://fipe.api.bipcheckout.com/years/${year}/brands/${marca}/group_models/${modelo}/models`
  );
  return res.json(data);
});

routes.get("/vehicle/:versao", async (req, res) => {
  const { versao } = req.params;
  const { data } = await axios(
    `https://fipe.api.bipcheckout.com/teste/vehicle/${versao}`
  );
  return res.json(data);
});

routes.post("/", async (req, res) => {
  const { vehicle } = req.body;
  veiculos.push(vehicle);
  return res.json({ saved: true });
});

export { routes };
