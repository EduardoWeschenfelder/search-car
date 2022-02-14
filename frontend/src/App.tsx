import React, { CSSProperties, useEffect, useState } from "react";
import Select from "react-select";
import api from "./services/api";

function App() {
  const [selectYear, setselectYear] = useState(null);
  const [selectMarca, setselectMarca] = useState(null);
  const [years, setYears] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelo] = useState([]);
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
    setModelo(data);
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
  
  const formatGroupLabel = (data: any) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <div>
      <Select
        defaultValue={selectYear}
        onChange={handleSelecYear}
        options={years}
        // styles={groupBadgeStyles}
        formatGroupLabel={formatGroupLabel}

      />
      {selectYear ? (
        <Select
          defaultValue={selectMarca}
          onChange={handleSelecMarca}
          options={marcas}
          // styles={groupBadgeStyles}
          formatGroupLabel={formatGroupLabel}

        />
      ) : null}
    </div>
  );
}

export default App;
