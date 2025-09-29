import React from 'react'
import './PageQrCode.css'
import { RiArrowGoBackLine } from "react-icons/ri";

const PageQrCode = () => {
    return (
        <div className='containerPage'>
            <div className='containerQr'>
                <div className='btnVoltar'>
                    <RiArrowGoBackLine />
                </div>
                <img src="/qrcode.png" alt="QrCode" className='qr' />
            </div>
        </div>
    )
}

export default PageQrCode

