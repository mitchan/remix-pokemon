import { MetaFunction, LoaderFunction, useLoaderData } from "remix";

type PokemonResult = {
  name: string;
  url: string;
};

type Pokemon = PokemonResult & {
  id: string;
  imageUrl: string;
};

type LoaderData = {
  data: Pokemon[];
};

function enhanceData(p: PokemonResult) {
  const pokemonID = p.url.split("/").at(-2);
  return {
    ...p,
    id: pokemonID,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`,
  };
}

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  const resp = await fetch("https://pokeapi.co/api/v2/pokemon");
  const { results } = await resp.json();

  return {
    data: results.map(enhanceData),
  };
};

export let meta: MetaFunction = () => {
  return {
    title: "Pokemon list",
    description: "A list of pokemon",
  };
};

export default function Index() {
  const { data } = useLoaderData<LoaderData>();

  return (
    <div>
      <ul>
        {data.map((p) => (
          <li key={p.name}>
            {p.name} <img src={p.imageUrl} alt={`Image of a ${p.name}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
