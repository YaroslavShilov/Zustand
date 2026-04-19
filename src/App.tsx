import "./App.css";
import {
  type FetchPokemonsParams,
  usePokemonsStore,
} from "./store/pokemons.ts";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState<FetchPokemonsParams>({
    takeCount: 5,
    offset: 0,
  });
  const { isLoading, list, fetchPokemons, error } = usePokemonsStore();

  const submit = () => {
    fetchPokemons(query);
  };

  const loadMore = () => {
    const newQuery = { ...query, offset: query.offset + query.takeCount };
    setQuery(newQuery);
    fetchPokemons(newQuery);
  };

  return (
    <div>
      <button onClick={submit}>fetch</button>
      {list.map(({ name, id, image }) => (
        <div key={id}>
          <p>name: {name}</p>
          <p>#{id}</p>
          <img src={image} alt={name} />
        </div>
      ))}
      {isLoading && "Loading"}
      {error && "Error: " + error}
      <button onClick={loadMore}>loadMore</button>
    </div>
  );
}

export default App;
