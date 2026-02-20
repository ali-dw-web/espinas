import Back from './backup.jsx'

export default async function Rez({params}) {
    let x =  await params
    let num = parseInt(x.slug)
    
    
   
    
    return(
        <>
            <Back r={num}/>
        </>
    )
}