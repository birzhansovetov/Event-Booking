import { useState,useEffect } from "react";


export default function ShowEvents(){

    const[events,setEvents] = useState([])

    useEffect(()=> {
        const fetchEvents = async ()=>{
            try{
                const response = await fetch("http://localhost:3001/events")
                if (response.ok){
                    const data = await response.json();
                    setEvents(data);
                
                }else{
                    alert("Ошибка при загрузке" )
                }
            }catch (error) {
                console.error("Ошибка запроса:", error);
              }
        }
        fetchEvents();
    },[])
    
    return(
        <div>
            <h2>Все мероприятия</h2>
            {events.map(event => (
                <div key={event.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Дата:{event.date}</p>
                    <p>Количество мест:{event.capacity}</p>
                </div>  
            ))}
        </div>
    )
}