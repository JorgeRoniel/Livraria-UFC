import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import CadastroLivro from "./CadastroLivro";
import EditarConta from "./EditarConta";
import { isAuthenticated, logout } from "./auth";
import { VITE_API_BASE_URL, VITE_NOTIFICATIONS_WS_URL } from "./config";

export default function Bookstore() {
  const [userBalance, setUserBalance] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    setIsLoggedIn(true);

    const savedBalance = localStorage.getItem("userBalance");
    if (savedBalance) {
      setUserBalance(savedBalance);
    }

    const userId = localStorage.getItem("userId");

    fetch(`${VITE_API_BASE_URL}/api/order/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Falha ao buscar pedidos");
        }
        return res.json();
      })
      .then((orders) => {
        setBooksData(orders);
      })
      .catch((error) => {
        console.error("Erro ao buscar pedidos do usuário:", error);
      });

    const socketConnection = new WebSocket(VITE_NOTIFICATIONS_WS_URL);

    socketConnection.onopen = () => {
  console.log("Conectado ao servidor de notificações WebSocket");
};

    socketConnection.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.id_pedido && data.status) {
          setBooksData((prevBooks) =>
            prevBooks.map((book) =>
              book.id === data.id_pedido ? { ...book, status: data.status } : book
            )
          );

          if (data.valor) {
            setUserBalance(data.valor);
            localStorage.setItem("userBalance", data.valor);
          }
        }
      } catch (error) {
        console.error("Erro ao processar mensagem do servidor:", error);
      }
    };

    socketConnection.onclose = () => {
      console.log("Conexão com o servidor de notificações encerrada.");
    };

    return () => {
      socketConnection.close();
    };
  }, [navigate]);

  const handleBalanceUpdate = (newBalance) => {
    setUserBalance(newBalance);
    localStorage.setItem("userBalance", newBalance);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleBuy = (bookId, bookPreco) => {
    setBooksData((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, status: "Processando" } : book
      )
    );
  
    const userId = localStorage.getItem("userId");
    const saldoCliente = localStorage.getItem("userBalance");
    
    const quantidade = 1;
  
    fetch(`http://localhost:5000/pagamento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_pedido: bookId,
        id_cliente: userId,
        quantidade: quantidade,
        preco: bookPreco,
        saldo_cliente: saldoCliente,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Falha ao processar pagamento");
        }
        return res.json();
      })
      .then((response) => {
        console.log("Resultado do pagamento:", response);
      })
      .catch((error) => {
        console.error("Erro ao processar pagamento:", error);
      });
  };

  const filteredBooks = booksData.filter((book) => {
    const nomeLivro = (book.bookName || book.title || "").toLowerCase();
    return nomeLivro.includes(search.toLowerCase());
  });
  

  return (
    <>
      {isLoggedIn && (
        <div className="top-bar">
          <button onClick={handleLogout} className="logout">
            Sair
          </button>
          <h1 className="titulo">Livraria - UFC</h1>
          <h1 className="titulo">Saldo: R$ {userBalance}</h1>
          <Link to="/editar-conta" className="button">
            Editar Conta
          </Link>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <div className="container">
                <div className="div-topo">
                  <h1 className="titulo">Meus pedidos</h1>
                  <Link to="/CadastroLivro" className="button cadastro">
                    Solicitar
                  </Link>
                </div>
                <div className="search-input">
                  <input
                    placeholder="Consultar pedido"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="lista-livros">
              {filteredBooks?.length > 0 ? (
                 filteredBooks
                  .slice(page * 3, (page + 1) * 3)
                  .map((book) => (
                    <div key={book.id} className="card">
                     <p className="font-bold">
                        Título: {book.bookName || book.title}
                     </p>
                      <p>Autor(a): {book.author || "Desconhecido"}</p>
                        <p>
                         A partir de <strong>R$ {book.price}</strong>
                       </p>

                     <div className="div-status">
                     <button
                          className="button"
                            onClick={() => handleBuy(book.id, book.price)}
                        >
                          Comprar
                       </button>
                      <span
                           className={`status ${
                         book.status?.toLowerCase() || "Awaiting"
                         }`}
                         >
                          Status: {book.status || "Pendente"}
                       </span>
                     </div>
                   </div>
                    ))
                   ) : (
                 <p className="mensagem">Nenhum livro encontrado.</p>
                 )}
                </div>
                <div className="pagination">
                  {page > 0 && (
                    <button
                      className="button"
                      onClick={() => setPage(page - 1)}
                    >
                      ⬅
                    </button>
                  )}
                  {(page + 1) * 3 < booksData.length && (
                    <button
                      className="button"
                      onClick={() => setPage(page + 1)}
                    >
                      ➡
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)}  onBalanceUpdate={handleBalanceUpdate}/>
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)}  onBalanceUpdate={handleBalanceUpdate}  />}
        />
        <Route
          path="/CadastroLivro"
          element={
            isLoggedIn ? (
              <CadastroLivro />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/editar-conta"
          element={
            isLoggedIn ? (
              <EditarConta onBalanceUpdate={handleBalanceUpdate} />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
      </Routes>
    </>
  );
}
