import { useEffect, useState } from "react";
import axios from 'axios';
import PetCard from "../../components/PetCard/PetCard";
import Navbar from '../../components/Navbar/Navbar';

export default function UserPets() {
  const [pets, setPets] = useState();

  useEffect(() => {
    axios.get(process.env.REACT_APP_USER_PETS, { withCredentials: true })
      .then((data) => setPets(data.data));
  }, [])

  
  return (
    <>
    <Navbar />
      { pets ? pets.map(pet => {
        return <PetCard pet={pet} />
      }) : null }
    </>
  )
}