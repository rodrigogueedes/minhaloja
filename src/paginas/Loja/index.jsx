
import { useEffect, useState } from "react";
import ProdutoCard from "../../components/ProdutoCard";
import "./estilos.css";

function Loja({ onComprar, quantidadesCarrinho = {} }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://10.0.1.90:3000/products")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao buscar produtos.");
        }

        return resposta.json();
      })
      .then((dados) => {
        setProdutos(dados);
      })
      .catch(() => {
        setErro("Não foi possível carregar os produtos.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <p className="loja-mensagem">Carregando produtos...</p>;
  }

  if (erro) {
    return <p className="loja-mensagem">{erro}</p>;
  }

  return (
    <main className="loja-container">
      <h1>Nossa Loja</h1>

      <section className="loja-grid">
        {produtos.map((produto) => (
          <ProdutoCard
            key={produto.id}
            foto={produto.image}
            nome={produto.name}
            categoria={produto.category}
            preco={produto.price / 100}
            precoPromocional={produto.promoPrice != null ? produto.promoPrice / 100 : null}
            stock={produto.stock}
            quantidadeNoCarrinho={quantidadesCarrinho[produto.id] ?? 0}
            onComprar={() => onComprar?.(produto)}
          />
        ))}
      </section>
    </main>
  );
}

export default Loja;
