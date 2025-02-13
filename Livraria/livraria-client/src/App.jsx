import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import CadastroLivro from "./CadastroLivro";
import EditarConta from "./EditarConta";
import { isAuthenticated, logout} from "./auth";

export default function Bookstore() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());

    // Buscar livros da API
    fetch("http://localhost:5000/api/livros")
      .then((response) => response.json())
      .then((data) => {
        setBooksData(data.sort((a, b) => a.title.localeCompare(b.title)));
      })
      .catch((error) => console.error("Erro ao buscar livros:", error));

    // Conectar ao WebSocket do servidor de notificações
    const socketConnection = new WebSocket("ws://localhost:8080");
    setSocket(socketConnection);

    socketConnection.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.orderId && data.status) {
          setBooksData((prevBooks) => 
            prevBooks.map((book) => 
              book.id === data.orderId ? { ...book, status: data.status } : book
            )
          );
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
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleBuy = (bookId) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket não está conectado.");
      return;
    }
  
    const orderRequest = {
      action: "createOrder",
      orderId: bookId,
      description: `Compra do livro ${booksData.find((b) => b.id === bookId)?.title || 'Desconhecido'}`,
      value: "XX"
    };
  
    setBooksData((prevBooks) => 
      prevBooks.map((book) => 
        book.id === bookId ? { ...book, status: "Processando" } : book
      )
    );
  
    socket.send(JSON.stringify(orderRequest));
    console.log("Pedido enviado:", orderRequest);
  };

  return (
    <>
    {isLoggedIn && (
      <div className="top-bar">
        <button onClick={handleLogout} className="logout">Sair</button>
        <h1 className="titulo">Livraria - UFC</h1>
        <Link to="/editar-conta" className="button">Editar Conta</Link>
      </div>
    )}
    <Routes>
      <Route path="/" element={isLoggedIn ? (
        <div className="container">
          <div className="div-topo">
            <h1 className="titulo">Meus pedidos</h1>
            <Link to="/CadastroLivro" className="button cadastro">Solicitar</Link>
          </div>
          <div className="search-input">
            <input
              placeholder="Consultar pedido"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="lista-livros">
            {booksData.slice(page * 3, (page + 1) * 3).map((book) => (
              <div key={book.id} className="card">
                <p className="font-bold">Título: {book.title}</p>
                <p>Autor(a): {book.author}</p>
                <p>A partir de <strong>R$ {book.price}</strong></p>
                <div className="div-status">
                  <button className="button" onClick={() => handleBuy(book.id)}>Comprar</button>
                  <span className={`status ${book.status?.toLowerCase() || ''}`}>Status: {book.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {page > 0 && <button className="button" onClick={() => setPage(page - 1)}>⬅</button>}
            {((page + 1) * 3) < booksData.length && (
              <button className="button" onClick={() => setPage(page + 1)}>➡</button>
            )}
          </div>
        </div>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )} />
      <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
      <Route path="/CadastroLivro" element={isLoggedIn ? <CadastroLivro /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
      <Route path="/editar-conta" element={isLoggedIn ? <EditarConta /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
    </Routes>
    </>
  );
}
