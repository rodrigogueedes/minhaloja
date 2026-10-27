
import "./estilos.css";

function ProdutoCard({ foto, nome, categoria, preco, precoPromocional, stock, quantidadeNoCarrinho, onComprar }) {
  const temPromocao = precoPromocional != null;

  return (
    <div className="produto-card">
      {stock === 0 && <span className="produto-card__selo-esgotado">Esgotado</span>}
      <img src={foto} alt={nome} />

      <h2>{nome}</h2>
      <p>{categoria}</p>

      <p>
        {temPromocao && (
          <span className="produto-card__preco-original">
            {preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        )}
        <strong>
          {(temPromocao ? precoPromocional : preco).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </strong>
      </p>

      <button
        className="produto-card__botao"
        onClick={onComprar}
        disabled={stock <= 0 || quantidadeNoCarrinho >= stock}
        type="button"
      >
        {stock > 0 ? "Comprar" : "Indisponível"}
      </button>
    </div>
  );
}

export default ProdutoCard;
