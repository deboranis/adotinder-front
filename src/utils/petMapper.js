export default function petMapper(values) {
  const mapped = values;
  if (values.sexo === 'femea') {
    values.sexo = true;
  } else values.sexo = false;

  if (values.especie === "cachorro") {
    values.especie = true;
  } else values.especie = false;

  if (values.castrado === "sim") {
    values.castrado = true;
  } else values.castrado = false;

  if (values.vacinas === "sim") {
    values.vacinas = true;
  } else values.vacinas = false;

  if (values.vermifugo === "sim") {
    values.vermifugo = true;
  } else values.vermifugo = false;

  if (values.socializaAnimais === "sim") {
    values.socializaAnimais = true;
  } else values.socializaAnimais = false;

  if (values.socializaCriancas === "sim") {
    values.socializaCriancas = true;
  } else values.socializaCriancas = false;

  if (values.fiv === "sim") {
    values.fiv = true;
  } else values.fiv = false;

  if (values.felv === "sim") {
    values.felv = true;
  } else values.felv = false;

  if (values.especie === 'cachorro') {
    delete values.fiv;
    delete values.felv;
  }
  console.log(mapped);
  return mapped;
}