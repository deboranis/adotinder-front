import { useEffect, useState } from "react";
import axios from 'axios';
import PetCard from '../../components/PetCard/PetCard';
import Navbar from '../../components/Navbar/Navbar';

export default function Results({ location }) {
  const [pets, setPets] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_QUIZ_RESULT}/${location.state}`, { withCredentials: true })
      .then((data) => setPets(data.data))
  }, [location.state]);

  return (
    <>
      <Navbar />
      {pets ? pets.map((pet, i) => <PetCard pet={pet} key={i}/>) : null}
    </>
  )
}