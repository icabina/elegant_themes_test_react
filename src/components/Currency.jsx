import axios from "axios";

//FETCH
async function convertFetch(base, destination) {
  const result = await fetch(
    `https://api.exchangereatesapi.io/latest?base=${base}`
  );
  if (!result.ok) {
    throw new Error(`Request failed with code ${result.status}`);
  }
  const data = await result.json();
  return data.rates[destination];
}

//AXIOS
async function convertAxios(base, destination) {
  const result = await axios.get(
    `https://api.exchangereatesapi.io/latest?base=${base}`
  );
  return result.data.rates[destination];
}

export { convertAxios as convert };
