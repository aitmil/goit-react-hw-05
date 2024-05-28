import { MdSearch } from "react-icons/md";

import css from "./SearchBar.module.css";

export default function SearchBar({ filter, onSearch }) {
  return (
    <form className={css.form}>
      <button type="submit" className={css.btn}>
        <MdSearch size={24} />
      </button>
      <input
        className={css.input}
        autoComplete="off"
        autoFocus
        placeholder="Search movie..."
        value={filter}
        onChange={(e) => onSearch(e.target.value)}
      />
    </form>
  );
}
