export const get = (string) => {
  const authed = JSON.parse(localStorage.getItem(string));
  return authed && authed.success === true ? authed : false;
};
// função que recebe uma string e busca no localStorage uma chave com essa string.
// se a chave existir e contiver uma propriedade "success" com valor true, retorna a chave. senão, retorna false.

export const set = (string, value) => localStorage.setItem(string, JSON.stringify(value));
// vai criar uma chave-valor em strings dentro do objeto localStorage

export const remove = () => localStorage.removeItem('authed');
// vai la e remove a chave. para o botão de logout!