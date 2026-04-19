import "./App.css";
import { useEffect, useState } from "react";

const BASEURL = "https://pokeapi.co/api/v2/";

function App() {
  const [state, setState] = useState(false);
  return (
    <div>
      <button onClick={() => setState(!state)}>do</button>
      {state && <Pokemons />}
    </div>
  );
}

const fetchPokemons = ({
  takeCount,
  pageNumber,
}: {
  takeCount: number;
  pageNumber: number;
}) => {
  const offset = pageNumber > 1 ? (pageNumber - 1) * takeCount : 0;
  const url = new URL(BASEURL + "pokemon/");
  url.searchParams.append("limit", String(takeCount));
  url.searchParams.append("offset", String(offset));

  return fetch(url)
    .then((res) => res.json())
    .then((res) =>
      res.results.map((item: { name: string; url: string }) => {
        const id = item.url.split("/").at(-2);
        console.log("id: ", id);

        return {
          id,
          name: item.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
          url: item.url,
        };
      }),
    )
    .catch((err) => {
      console.log("err", err);
    });
};

const Pokemons = () => {
  const [state, setState] = useState<{
    value: { name: string; id: string | number; img: string }[] | null;
    isLoading: boolean;
  }>({ value: null, isLoading: true });

  useEffect(() => {
    fetchPokemons({ takeCount: 10, pageNumber: 1 }).then((res) => {
      console.log("an: ", res);
      setState({ value: res, isLoading: false });
    });
  }, []);

  return (
    <div>
      {state.isLoading && "Loading..."}
      {!state.isLoading && state.value && (
        <div>
          {state.value.map(({ name, id, img }) => (
            <div key={id}>
              <p>{name}</p>
              <p>#{id}</p>
              <img src={img} alt={name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/*
type IPokemon = {
  name: string;
  url: string;
  img: string;
};
*/

export default App;
