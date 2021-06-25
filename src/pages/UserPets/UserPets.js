import { useEffect, useState } from "react";
import axios from 'axios';
// import { Typography } from "@material-ui/core";
import PetCard from "../../components/PetCard/PetCard";

export default function UserPets() {
  const [pets, setPets] = useState();

  useEffect(() => {
    axios.get(process.env.REACT_APP_USER_PETS, { withCredentials: true })
      .then((data) => setPets(data.data));
  }, [])

  
  return (
    <>
      { pets ? pets.map(pet => {
        return <PetCard pet={pet} />
      }) : null }
    </>
  )
}