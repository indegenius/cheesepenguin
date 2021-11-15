import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [cheese, setCheese] = useState(null);

  const URL = "https://cheesepenguin.herokuapp.com/cheese/";

  const getCheese = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheese(data);
  };

  const createCheese = async (cheeseon) => {
    // make post request to create cheese
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheeseon),
    });
    // update list of cheese
    getCheese();
  };

  const updateCheese = async (cheeseon, id) => {
    // make post request to create cheese
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheeseon),
    });
    // update list of cheese
    getCheese();
  };

  const deleteCheese = async (id) => {
    // make post request to create cheese
    await fetch(URL + id, {
      method: "delete",
    });
    // update list of cheese
    getCheese();
  };



  useEffect(() => getCheese(), []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Index cheese={cheese} createCheese={createCheese}/>}/>
        <Route path="/cheese/:id" element={<Show/>}/>
      </Routes>
    </main>
  );
}

export default Main;