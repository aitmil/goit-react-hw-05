import { MdSearch } from "react-icons/md";

import css from "./SearchBar.module.css";

export default function SearchBar({ filter, onSearch }) {
  return (
    <div className={css.wrapper}>
      <MdSearch size={24} className={css.icon} />
      <input
        className={css.input}
        autoComplete="off"
        autoFocus
        placeholder="Search movie..."
        value={filter}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
