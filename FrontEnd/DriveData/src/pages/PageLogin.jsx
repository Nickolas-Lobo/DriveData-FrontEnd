import logo from "../assets/DriveData_Logo.png"
import { ButtonAdquira } from "../components/ButtonAdquira"
import Button from "../components/ButtonEntrar"
import { TextField } from "../components/Textfield"
import './PageLogin.css'


const PageLogin = () => {
  return (
    <div className="containerPage">
      <div id='containerLogin'>
          <img src={logo} alt="Logo DriveData" className="logo" />
          <TextField tipo={"text"} placeholder={"N° Identificador"}/>
          <Button/>
          <ButtonAdquira/>
      </div>
    </div>
  )
}

export default PageLogin