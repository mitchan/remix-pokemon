import * as R from 'ramda';
import React from 'react';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';

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
  const urlSplitted = R.compose<PokemonResult, string, string[]>(
    R.split('/'),
    R.prop('url'),
  )(p);

  // ID is in 6th position
  const id = urlSplitted[6];

  return {
    ...p,
    id,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
}

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async () => {
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon');
  const { results } = await resp.json();

  return {
    data: results.map(enhanceData),
  };
};

export const meta: MetaFunction = () => ({
  title: 'Pokemon list',
  description: 'A list of pokemon',
});

const renderPokemon = R.map<Pokemon, JSX.Element>((p) => (
  <li key={p.name}>
    {p.name} <img src={p.imageUrl} alt={`Image of a ${p.name}`} />
  </li>
));

export default function Index() {
  const loaderData = useLoaderData<LoaderData>();

  return (
    <div>
      <ul>{renderPokemon(R.prop('data', loaderData))}</ul>
    </div>
  );
}
