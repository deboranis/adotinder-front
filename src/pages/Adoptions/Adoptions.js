import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import AdoptionCard from '../../components/AdoptionCard/AdoptionCard';

export default function Adoptions() {
  const [adoptions, setAdoptions] = useState();

  useEffect(() => {
    axios.get(process.env.REACT_APP_ADOPTIONS_ADOTANTE, { withCredentials: true })
      .then((data) => setAdoptions(data.data));
  }, []);

  return (
    <>
      <Navbar />
      {adoptions ? adoptions.map((adoption, i) => <AdoptionCard adocao={adoption} key={i} />) : null }
    </>
  )

}