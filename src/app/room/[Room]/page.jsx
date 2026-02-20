import Room from './backup'
export default async function Org({params}){
const url = await params
const time = decodeURIComponent(url.Room)


return(
    <>
    <Room time={time}/>
    </>
)

}