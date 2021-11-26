import React from 'react';
import { Outlet } from 'remix';

export default function PokemonIndex() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
