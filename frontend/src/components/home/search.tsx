import { FC } from "react";
type props = {
  search: string;
  setSearch: (search: string) => void;
};
export const Search: FC<props> = ({ search, setSearch }) => {
  return (
    <input
      style={{
        width: "100%",
      }}
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search on name, category or description"
    />
  );
};
