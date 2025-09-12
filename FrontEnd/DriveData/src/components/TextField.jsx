import "./TextField.css"

export const TextField = ({tipo,placeholder,setFunction,valor}) => {
  return (
    <input type={tipo} placeholder={placeholder} value={valor} onChange={(e)=>setFunction(e.target.value)} />
  )
}
