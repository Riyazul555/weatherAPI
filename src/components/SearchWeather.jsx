import React, {useState, useEffect} from "react";

const SearchWeather = () => {
    const [search, setSearch]= useState("london");
    const [data, setData]= useState([]);
    const [input, setInput]= useState("");
    let componentMounted = true;

    useEffect(() => {
       const fetchWeather = async () =>{
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+ search +'&appid=647a8ed7eb6bd9924fc5e45ff4d60622');
        if(componentMounted){
            setData(await response.json());
            console.log(data)
        }
        return () => {
            componentMounted = false;
        }
       }
       fetchWeather();
    }, [search]);

    let emoji = null;
    if(typeof data?.main != "undefined"){
       if(data?.weather?.[0]?.main == 'Clouds'){
        emoji = 'fa-cloud';
       }
       else if(data?.weather?.[0]?.main == 'Thunderstroms'){
        emoji = 'fa-bolt';
       }
       else if(data?.weather?.[0]?.main == 'Drizzle'){
        emoji = 'fa-cloud-rain';
       }
       else if(data?.weather?.[0]?.main == 'Rain'){
        emoji = 'fa-cloud-shower-heavy';
       }
       else if(data?.weather?.[0]?.main == 'Snow'){
        emoji = 'fa-snow-flake';
       }
       else{
        emoji = 'fa-smog';
       }

    }

    let temp = (data?.main?.temp - 273.15).toFixed(2);
    let tempMin = (data?.main?.temp_min - 273.15).toFixed(2);
    let tempMax = (data?.main?.temp_max - 273.15).toFixed(2);
    let feelsLike = (data?.main?.feels_like - 273.15).toFixed(2);
    let pressure1 = (data?.main?.pressure);
    let humidity1 = (data?.main?.humidity);
    let visibility1 = (data?.visibility);
    

    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default",{month:'long'});
    let day = d.toLocaleString("default",{weekday:'long'});


    let time = d.toLocaleString([],{
        hour : '2-digit',
        minute : '2-digit',
        second : '2-digit',
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    }


    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div class="card text-white text-center border-0">
                            <img src={'https://source.unsplash.com/600x900/?'+ data?.weather?.[0]?.main} class="card-img" alt="..." />
                            <div class="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div class="input-group mb-4 w-75 mx-auto">
                                        <input type="search" class="form-control" placeholder="Search City" aria-label="Search City" aria-describedby="basic-addon2"  name="search" value={input} onChange ={(e)=>setInput(e.target.value)} required/>
                                        <button type="submit" class="input-group-text" id="basic-addon2">
                                    
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                <h2 class="card-title">{data.name}</h2>
                                <p class="card-text lead">
                                   {day}, {month}  {date}, {year}
                                   <br/>
                                   {time}
                                </p>
                                <hr />
                                
                                <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                                <p className="lead fw-bolder mb-0">{data?.weather?.[0]?.main}</p>
                                <p className="lead">Feels like {feelsLike} &deg;C</p>
                                <p className="lead">{tempMin} &deg;C | {tempMax} &deg;C</p>
                                <p className="lead"> Pressure is {pressure1} bars</p>
                                <p className="lead"> Humidity is {humidity1}%</p>
                                <p className="lead"> Visibility is {visibility1} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchWeather;
