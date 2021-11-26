import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import React from 'react';

type Pokemon = {
  name: string;
  height: number;
  weight: number;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ params }) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  return resp;
};

export let meta: MetaFunction = () => {
  return {
    title: 'Pokemon list',
    description: 'A list of pokemon',
  };
};

export default function PokemonIndex() {
  const pokemon = useLoaderData<Pokemon>();
  console.log(pokemon);

  return (
    <div>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <ul>
        <li>Height: {pokemon.height}</li>
        <li>Weight: {pokemon.weight}</li>
      </ul>
    </div>
  );
}
