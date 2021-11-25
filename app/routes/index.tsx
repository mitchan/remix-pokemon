import type { MetaFunction, LoaderFunction } from "remix";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  return null;
};

export let meta: MetaFunction = () => {
  return {
    title: "Pokemon list",
    description: "A list of pokemon"
  };
};

export default function Index() {
  return (
    <div>
      It works!
    </div>
  );
}
