import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

export const Navigation = () => {
  const getLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};
