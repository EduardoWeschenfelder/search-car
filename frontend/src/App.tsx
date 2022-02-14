import React, { CSSProperties, useEffect, useState } from "react";
import Select from "react-select";
import api from "./services/api";

function App() {
  const [selectYear, setselectYear] = useState(null);
  const [selectMarca, setselectMarca] = useState(null);
  const [selectModelo, setselectModelo] = useState(null);
  const [selectVersion, setselectVersion] = useState(null);
  const [vehicle, setVehicle] = useState(null)
  const [years, setYears] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [verions, setVersions] = useState([]);
  useEffect(() => {
    async function loadYears() {
      const { data } = await api.get("/");
      setYears(data);
    }

    loadYears();
  }, []);

  const handleSelecYear = async (select: any) => {
    setselectYear(select.value);
    const yearId = select.value;
    const { data } = await api.get(`/${yearId}/marca`);
    setMarcas(data);
  };

  const handleSelecMarca = async (select: any) => {
    setselectMarca(select.value);
    const marcaId = select.value;
    const { data } = await api.get(`${selectYear}/${marcaId}/modelo`);
    setModelos(data);
  };

  const handleSelecModelo = async (select: any) => {
    setselectModelo(select.value);
    const modeloId = select.value;
    const { data } = await api.get(`${selectYear}/${selectMarca}/${modeloId}/versao`);
    setVersions(data);
  };

  const handleSelecVersion = async (select: any) => {
    setselectVersion(select.value);
    const versionId = select.value;
    const { data } = await api.get(`vehicle/${versionId}`);
    setVehicle(data)
    
  };
  const savevehicle = async () => {

    await (await api.post('/',{vehicle}));

    
  };

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles: CSSProperties = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };
  const butonStyles: CSSProperties = {
    backgroundColor: '#008CBA', /* Green */
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  }
  
  const formatGroupLabel = (data: any) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <div>
      <p>Selecione o ano:</p>
      <Select
        defaultValue={selectYear}
        onChange={handleSelecYear}
        options={years}
        formatGroupLabel={formatGroupLabel}
      />
      {selectYear ? (
        <>
        <p>Selecione a marca:</p>
        <Select
          defaultValue={selectMarca}
          onChange={handleSelecMarca}
          options={marcas}
          formatGroupLabel={formatGroupLabel}
        />
        </>
      ) : null}
      {selectYear && selectMarca ? (
        <>
        <p>Selecione o modelo:</p>
        <Select
          defaultValue={selectModelo}
          onChange={handleSelecModelo}
          options={modelos}
          formatGroupLabel={formatGroupLabel}
        />
        </>
      ) : null}
      {selectYear && selectMarca && selectModelo ? (
        <>
        <p>Selecione a versão:</p>
        <Select
          defaultValue={selectVersion}
          onChange={handleSelecVersion}
          options={verions}
          formatGroupLabel={formatGroupLabel}
        />
        </>
      ) : null}
      {
        selectYear && selectMarca && selectModelo && selectVersion ? (
          <div>
          <button style={butonStyles} onClick={savevehicle}>
            Continuar
          </button>
          </div>
        ) : null
      }

    </div>
  );
}

export default App;
