async function fetchData(id) {
  try {
    let response;
    let array = [];

    if (id === undefined) {

      for(let i = 1; i <= 826; i++) {
        array.push(i);
      }

      response = await fetch(`https://rickandmortyapi.com/api/character/${array}`);

    } else {
      response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

export default fetchData;
