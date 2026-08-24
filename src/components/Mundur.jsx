import React from 'react';
import { Link } from 'react-router-dom';

export default function Mundur() {
  return (
    <article id="mundur">
      <Link to="/harcerz" className="custom-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="major">Poradnik mundurowy</h2>
      <ul className="actions fit">
        <li>
          <a href="https://www.wgl.pl/category/skladnica-harcerska-umundurowanie-mundur-harcerski?filter=1" target="_blank" rel="noreferrer" className="button fit">
            <i className="fa-solid fa-shirt"></i>&nbsp; Gdzie zakupić mundur?
          </a>
        </li>
        <li>
          <a href="https://www.wgl.pl/category/skladnica-harcerska-umundurowanie-mundur-harcerski?filter=1" target="_blank" rel="noreferrer" className="button fit">
            <i className="fa-solid fa-shirt"></i>&nbsp; Gdzie zakupić mundur?
          </a>
        </li>
      </ul>
    </article>
  );
}