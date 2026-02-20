import Backup from './backup'
export default async function Room({params}){
   
        const id = await params
        const num = id.id
        
    
    return(
        <>
        <Backup id={num}/>
            
        </>
    )
}