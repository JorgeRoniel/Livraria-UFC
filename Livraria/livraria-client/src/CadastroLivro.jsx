import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CadastroLivro.css';
import { VITE_API_BASE_URL } from "./config";

export default function CadastroLivro() {
  const [title, setTitle] = useState(""); 
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      alert("Usuário não encontrado!");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/api/order`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookName: title,
          price: parseFloat(price),
          userId: userId
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar livro.");
      }

      alert("Livro cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container position">
      <div className="header">
        <button onClick={() => navigate("/")} className="back-button">⮜</button>
        <h2 className="titulo-livro">Novo pedido</h2>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Título" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Preço" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <div className="botoes-base">
          <button className="button" type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}</button>
          <button className="clear" type="button" onClick={() => { setTitle(""); setPrice(""); }}>Limpar</button>
        </div>
      </form>
    </div>
  );
}
