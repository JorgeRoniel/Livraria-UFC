import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditarConta.css";

export default function EditarConta() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar os dados do usuário autenticado
    fetch("http://localhost:5000/api/usuario", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authToken"))?.token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      setEmail(data.email);
    })
    .catch(error => console.error("Erro ao buscar usuário:", error));
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/editar-usuario", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authToken"))?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Conta atualizada com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao atualizar conta");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
    }
  };

  return (
    <div className="container-editar container">
        <div className="header">
      <button className="logout" onClick={() => navigate("/")}>⮜</button>
      <h2 className="titulo">Editar Conta</h2>
      <div className="logout" style={{opacity: 0, cursor: 'default'}}></div>
      </div>
      <form onSubmit={handleEditSubmit}>
        <input type="email" placeholder="Novo email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="baixo">
            <button type="submit" className="button" >Salvar Alterações</button>
            <button className="clear" type="button" onClick={() => { setEmail(""); setPassword(""); }}>Limpar</button>
         </div>
        </form>
    </div>
  );
}
