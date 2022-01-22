import { useState, useEffect } from "react";

const localCache = {}; // przechowuje pobrane dane, po wybraniu jednej opcji np. bird dane sa zapisane w localCache
                      // po wybraniu innej opcji np. dog i powrocie na bird dane nie sa na nowo pobierane tylko wyciagane z localCache

export default function useBreedList(animal){
    const [breedList, setBreedList] = useState([]);  // tablica aktualnie wykorzystywanych pobranych elementow z API
    const [status, setStatus] = useState("unloaded");  // jesli żadne dane nie sa załadowane pokazujemy status unloaded


    useEffect(() =>{
    if(!animal){ // jesli zadne zwierze nie jest wybrane
        setBreedList([]); // to zwracamy pusta tablice
    }else if(localCache[animal]){  // jesli posiadamy w localCache potrzebne dane (czyli wczesniej juz je pobralismy) korzystamy z nich
        setBreedList(localCache[animal]);  // i przepisujemy do animal
    }else{
        requestBreedList();  // jesli danych jeszcze nie posiadamy wywolujemy funcke requestBreedList
    }

async function requestBreedList(){
    setBreedList([]) // w pierwszej kolejnosci czyścimy aktualnie wypełnioną tablicę 
    setStatus('loading');  // zmiana na status ładowanie

    const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`  // pobranie z API danych gdzie animal z API ==  przypisanie ${animal} u nas 
    )

    const json = await res.json();          // Przypisanie pobranych danych do zmiennej cost json przez wywołanie funkcji res.json()
    localCache[animal] = json.breeds || [];  // dodanie pobranych danych do localCache np. [dogs: {husky, spaniel, buldog}] LUB przekazanie pustej tablicy
    setBreedList(localCache[animal])  // przypisanie danych z localCache do BreedList
    setStatus("loaded") // zmiana statusu za załadowane dane.
}
}, [animal])  // <- wypełnienie useEffect uruchania sie gdy zostaje aktywowany/zmieniony formularz animals w html

return [breedList, status]; // mozemy rowniez zwracac obiekty {breedList, status}, 
}