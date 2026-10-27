
import { Link } from "react-router";
import "./estilos.css";

function MenuNavegacao({ quantidadeItens = 0 }) {
  return (
    <header className="menu-navegacao">
      <Link to="/" className="menu-logo">
        MinhaLoja
      </Link>

      <nav className="menu-links">
        <Link to="/">Loja</Link>
        <Link to="/admin">Painel</Link>
      </nav>

      <Link
        to="/carrinho"
        className="menu-carrinho"
        aria-label={`Carrinho com ${quantidadeItens} itens`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        <span className="menu-contador">
          {quantidadeItens}
        </span>
      </Link>
    </header>
  );
}

export default MenuNavegacao;
