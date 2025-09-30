import React from 'react'
import './PageQrCode.css'
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const PageQrCode = () => {
  const navigate = useNavigate();
    return (
        <div className='containerPage'>
            <div className='containerQr'>
                <div className='btnVoltar'>
                    <RiArrowGoBackLine onClick={() => navigate("/")}/>
                </div>
                <img src="/qrcode.png" alt="QrCode" className='qr' />
            </div>
        </div>
    )
}

export default PageQrCode

