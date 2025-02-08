import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CadastroLivro.css';

export default function CadastroLivro() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  // Função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const tokenData = localStorage.getItem("authToken");
    const token = tokenData ? JSON.parse(tokenData).token : null;

    try {
      const response = await fetch("http://localhost:5000/api/livros", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, author, price }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar livro.");
      }

      alert("Livro cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container position">
      <div className="header">
      <button onClick={() => navigate("/")} className="back-button">⮜</button>
        <h2 className="titulo-livro">Novo pedido</h2>
        <div className="logout" style={{opacity: 0, cursor: 'default'}}></div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Título" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Autor" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Preço" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <div className="botoes-base">
        <button className="button" type="submit">Enviar</button>
        <button className="clear" type="button" onClick={() => { setTitle(""); setAuthor(""); setPrice(""); }}>Limpar</button>
        </div>
      </form>
    </div>
  );
}