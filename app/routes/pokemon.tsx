import { Outlet } from 'remix';
import React from 'react';

export default function PokemonIndex() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
