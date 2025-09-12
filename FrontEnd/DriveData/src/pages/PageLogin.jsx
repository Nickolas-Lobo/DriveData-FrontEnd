import logo from "../assets/DriveData_Logo.png"
import { ButtonAdquira } from "../components/ButtonAdquira"
import Button from "../components/ButtonEntrar"
import { TextField } from "../components/Textfield"
import './PageLogin.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react";


const PageLogin = () => {

  const [autenticador, setAutenticador]=useState("");
  const navigate=useNavigate();

  const handleLogin = async () => {
    try {

      const autenticadorNumber = Number(autenticador);

      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ autenticador: autenticadorNumber}),
      })
      const data = await res.json();
      if (!res.ok) {
        alert(data.mensagem || "Número autenticador inválido!");
        return;
      }

      alert(data.mensagem);
      navigate("/pageInicio", { state: { idUsuario: data.user.ID } });
    }catch(err) {
      console.error("Erro no login:",err);
      alert("Número autenticador não encontrado")
    }
  }


  return (
    <div className="containerPage">
      <div id='containerLogin'>
          <img src={logo} alt="Logo DriveData" className="logo" />
          <TextField 
          tipo={"text"} 
          placeholder={"N° Identificador"}
          valor={autenticador}
          setFunction={setAutenticador}
          />
          <Button onClick={handleLogin}/>
          <ButtonAdquira/>
      </div>
    </div>
  )
}

export default PageLogin