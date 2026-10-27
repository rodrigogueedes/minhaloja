import "./estilos.css";
import { WHATSAPP_LOJISTA } from "../../config";

function formatarPreco(valorEmCentavos) {
  return (valorEmCentavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function Carrinho({ itens, onAumentarQuantidade, onDiminuirQuantidade, onRemover }) {
  const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0);
  const total = itens.reduce(
    (soma, item) => soma + (item.produto.promoPrice ?? item.produto.price) * item.quantidade,
    0,
  );
  const mensagemPedido = [
    "Olá! Gostaria de finalizar este pedido:",
    "",
    ...itens.map(({ produto, quantidade }) => {
      const preco = produto.promoPrice ?? produto.price;

      return `${produto.name}\nQuantidade: ${quantidade}\nSubtotal: ${formatarPreco(preco * quantidade)}`;
    }),
    "",
    `Total: ${formatarPreco(total)}`,
  ].join("\n");

  function finalizarPeloWhatsApp() {
    const url = `https://wa.me/${WHATSAPP_LOJISTA}?text=${encodeURIComponent(mensagemPedido)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (itens.length === 0) {
    return (
      <main className="carrinho-container">
        <h1>Meu carrinho</h1>
        <p className="carrinho-vazio">Seu carrinho está vazio.</p>
      </main>
    );
  }

  return (
    <main className="carrinho-container">
      <h1>Meu carrinho</h1>
      <ul className="carrinho-lista">
        {itens.map(({ produto, quantidade }) => {
          const preco = produto.promoPrice ?? produto.price;

          return (
            <li key={produto.id} className="carrinho-item">
              <span className="carrinho-produto-nome">{produto.name}</span>
              <div className="carrinho-controles-quantidade">
                <button
                  type="button"
                  onClick={() => onDiminuirQuantidade?.(produto.id)}
                  disabled={quantidade <= 1}
                  aria-label={`Diminuir quantidade de ${produto.name}`}
                >
                  −
                </button>
                <span aria-live="polite">{quantidade}</span>
                <button
                  type="button"
                  onClick={() => onAumentarQuantidade?.(produto)}
                  disabled={quantidade >= produto.stock}
                  aria-label={`Aumentar quantidade de ${produto.name}`}
                >
                  +
                </button>
              </div>
              <span className="carrinho-subtotal">
                Subtotal: <strong>{formatarPreco(preco * quantidade)}</strong>
              </span>
              <button
                className="carrinho-remover"
                type="button"
                onClick={() => onRemover?.(produto.id)}
                aria-label={`Remover ${produto.name} do carrinho`}
              >
                Remover
              </button>
            </li>
          );
        })}
      </ul>
      <p className="carrinho-quantidade-total">
        Total de itens: <strong>{quantidadeTotal}</strong>
      </p>
      <p className="carrinho-total">
        Total: <strong>{formatarPreco(total)}</strong>
      </p>
      <button
        className="carrinho-finalizar"
        type="button"
        onClick={finalizarPeloWhatsApp}
      >
        Finalizar pelo WhatsApp
      </button>
    </main>
  );
}

export default Carrinho;