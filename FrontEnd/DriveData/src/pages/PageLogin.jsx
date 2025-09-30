import logo from "../assets/DriveData_Logo.png"
import { ButtonAdquira } from "../components/ButtonAdquira"
import Button from "../components/ButtonEntrar"
import { TextField } from "../components/Textfield"
import './PageLogin.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react";


const PageLogin = () => {

  const [autenticador, setAutenticador] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!autenticador.trim()) {
      alert("Por favor, preencha o número identificador.");
      return;
    }

    try {
      const autenticadorNumber = Number(autenticador);

      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ autenticador: autenticadorNumber }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.mensagem || "Número autenticador inválido!");
        return;
      }

      alert(data.mensagem);
      try {
        const resAutomoveis = await fetch(`http://localhost:3000/automoveis/${data.user.ID}`, {
          method: "GET",
          credentials: "include",
        });
        const automoveis = await resAutomoveis.json();
        navigate("/pageInicio", { state: { idUsuario: data.user.ID } });
      } catch {
        navigate("/pageAdicionarCarro", { state: { idUsuario: data.user.ID } });
      }

    } catch (err) {
      console.error("Erro no login:", err);
      alert("Número autenticador não encontrado");
    }
  };


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
        <Button onClick={handleLogin} />
        <ButtonAdquira action={()=> navigate("/pageQrCode")}/>
      </div>
    </div>
  )
}

export default PageLogin