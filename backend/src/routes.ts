import { Router } from "express";
import axios from "axios";

const routes = Router();

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

  console.log({ year, marca });
  const { data } = await axios(
    `https://fipe.api.bipcheckout.com/years/${year}/brands/${marca}/group_models`
  );
  console.log({ data });

  return res.json(data);
});

export { routes };
