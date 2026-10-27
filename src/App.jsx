
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router";

import Loja from "./paginas/Loja";
import Carrinho from "./paginas/Carrinho";
import MenuNavegacao from "./components/MenuNavegacao";
import { useState } from "react";

// Páginas provisórias
function DetalhesProduto() {
  return <h1>Detalhes do produto</h1>;
}

function Admin() {
  return <h1>Painel administrativo</h1>;
}

function NovoProduto() {
  return <h1>Cadastrar novo produto</h1>;
}

function EditarProduto() {
  return <h1>Editar produto</h1>;
}

function NotFound() {
  return <h1>404 - Página não encontrada</h1>;
}

function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  function adicionarAoCarrinho(produto) {
    if (produto.stock <= 0) {
      return;
    }

    setItensCarrinho((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.produto.id === produto.id);

      if (itemExistente) {
        if (itemExistente.quantidade >= produto.stock) {
          return itensAtuais;
        }

        return itensAtuais.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...itensAtuais, { produto, quantidade: 1 }];
    });
  }

  function diminuirQuantidade(produtoId) {
    setItensCarrinho((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === produtoId && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item,
      ),
    );
  }

  function removerDoCarrinho(produtoId) {
    setItensCarrinho((itensAtuais) =>
      itensAtuais.filter((item) => item.produto.id !== produtoId),
    );
  }

  const quantidadeItens = itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  const quantidadesCarrinho = Object.fromEntries(
    itensCarrinho.map(({ produto, quantidade }) => [produto.id, quantidade]),
  );

  return (
    <BrowserRouter>
      <MenuNavegacao quantidadeItens={quantidadeItens} />

      <Routes>
        <Route
          path="/"
          element={
            <Loja
              onComprar={adicionarAoCarrinho}
              quantidadesCarrinho={quantidadesCarrinho}
            />
          }
        />

        <Route
          path="/produtos/:id"
          element={<DetalhesProduto />}
        />

        <Route
          path="/carrinho"
          element={
            <Carrinho
              itens={itensCarrinho}
              onAumentarQuantidade={adicionarAoCarrinho}
              onDiminuirQuantidade={diminuirQuantidade}
              onRemover={removerDoCarrinho}
            />
          }
        />

        <Route path="/admin" element={<Admin />} />

        <Route
          path="/admin/novo"
          element={<NovoProduto />}
        />

        <Route
          path="/admin/:id/editar"
          element={<EditarProduto />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
