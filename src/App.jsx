import { useEffect, useState } from "react";
import { api } from "./api/api";
import Style from "./App.module.css";

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    api.get("/delicia").then((res) => {
      setData(res.data.results);
    });
  }, []);

  useEffect(() => {
    api.get("/funcionarios").then((res) => {
      setData2(res.data.items);
      console.log(res.data.items);
    });
  }, []);

  return (
    <>
      <div className={Style.containerTudo}>
      <div className={Style.container1}>
        
        {data.map((item) => {
          return (
           <div key={item.id} className={Style.containerAuto}>                  
                <h3>{item.nome}</h3>
                <img src={item.imagem} alt="image" className={Style.image} />
            </div>
    
          );
        })}
       </div>
        <br />
        <br />
        <br />
        <div className={Style.container2}>
        {data2.map((item) => {
          return (
            <div key={item.id}>
              <h3>{item.nome}</h3>
              <p>{item.cargo}</p>
              <p>{item.idade}</p>
              <p>{item.custoPorHora}</p>
              <p>{item.temLicence ? "Habilitado 😁" : "Sem premissao 🤬"}</p>
            </div>
          );
        })}
        </div >
     

        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default App;
