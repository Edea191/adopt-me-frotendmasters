import React from "react";
import { useState, useEffect } from "react";
import Pet from "./Pet";
//import data from "./pets.json";
import useBreedList from "./useBreedList";


const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', "reptile"];

const SearchParams = () => {
    
    const [location, setLocation] = useState("Seattle, WA");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);

    const [BREEDS] = useBreedList(animal); // <- wypełnienie breedList przy pomocy fukcji useBreedList.js
   // const BREEDS = [];

    
    
    useEffect(() =>{
        requestPets();      // Użycie efektu przy korzystaniu z strony uruchamia requestPets
    }, []);   // dodajemy drugi argument pustej tablicy [] aby zapytanie poszło tylko raz i zapisało dane w tablicy, w innym przypadku kazdy uzycie 
                    // setPets(json.pets); CZYLI OGÓLNIE setPets powoduje że useEffect jest przy kazdym rendowaniu strony (czyt. CAŁY CZAS IDĄ ZAPYTANIA!)
                    // w pustej tablicy [] można podać argument Kiedy ma zostać wywołane zapytanie np. [animal]  
                    //powoduje wywołanie przy każdym skorzystaniu z formularza Animal na stronie
                    // --(wybranie odpowiedniego zwierzecia powoduje pobranie tylko tych danych co te zwierze zawierają)
    
  //  useEffect(() => {
  //     const timer = setTimeout (() => alert("hi"), 3000);    // Wywołanie alertu "hi" po skorzystaniu z aktualizacji const animal
     //   return () => clearTimeout(timer);
  //  }, [animal]);



    async function requestPets(){
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}` // Fukcja asynchroniczna działa równolegle do reszty 
        );                                                                                          // Tworzy zmienna res, która używa await(oczekiwanie)  
                                                                                                    // pobieranie danych z API fetch
        const json = await res.json();    // przypisanie pobranych danych z zmiennej res, do zmiennej json w formanie json -> res.json()

        //`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`

        console.log(json);

        setPets(json.pets);     // ustawanie useState pets, na dane z API 
    }
                                            // dajemy onSubmit na form zamiast onClick na button aby działał również ENTER na formularzu wpisania miasta
    return(                                 // e.preventDefault zapobiega odświeżaniu strony(przeslanie formularza) w React nie ma tej potrzeby
        <div className="Search-params">     
            <form onSubmit={(e) => {e.preventDefault(); requestPets()}}> 
                <label htmlFor="location"> 
                    <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location"/>
                </label>
                <label htmlFor="animal">
                    Animal
                    <select id="animal" value={animal} onChange={e => setAnimal(e.target.value)} onBlur={e => setAnimal(e.target.value)}>
                    <option/>
                    {ANIMALS.map((animal) => ( //               Połączenie  const ANIMALS. z UseState cost[animal, setAnimal] 
                        <option value={animal} key={animal}> 
                            {animal}
                        </option>
                    ))}
                    </select>

                </label>

                <label htmlFor="breed">
                    Breed
                    <select id="breed" value={breed} onChange={e => setBreed(e.target.value)} onBlur={e => setBreed(e.target.value)}>
                    <option/>
                    {BREEDS.map((breed) => ( //               Połączenie  const breed. z UseState cost[breed, setbreed] 
                        <option value={breed} key={breed}> 
                            {breed}
                        </option>
                    ))}
                    </select>

                </label>

                <button>Submit</button>
            </form>
         {
             pets.map(pet => (
                 <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id}/> // Połączenie zmiennej pet z const [pets, setPets]
             ))
         }

        </div>
    );
};

export default SearchParams;