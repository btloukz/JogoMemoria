import { useState } from "react";
import Carta from "./Carta";

export default function JogoMemoria() {
  const cartasIniciais = [
    { id: 1, nome: "🍎" },
    { id: 2, nome: "🍌" },
    { id: 3, nome: "🍇" },
    { id: 4, nome: "🍉" },
  ];

  function embaralhar(lista) {
    return [...lista].sort(() => Math.random() - 0.5);
  }

  const [cartasA, setCartasA] = useState(
    embaralhar(cartasIniciais.map((c) => ({ ...c, selecionada: false, achada: false })))
  );
  const [cartasB, setCartasB] = useState(
    embaralhar(cartasIniciais.map((c) => ({ ...c, selecionada: false, achada: false })))
  );

  const [primeira, setPrimeira] = useState(null);
  const [segunda, setSegunda] = useState(null);
  const [tentativas, setTentativas] = useState(5);
  const [mensagem, setMensagem] = useState("");

  function clicarCarta(lado, index) {
    if (mensagem.includes("errou")) return; // impede clique enquanto há erro

    if (lado === "A") {
      const novas = [...cartasA];
      novas[index].selecionada = true;
      setCartasA(novas);
      setPrimeira(novas[index]);
    } else {
      const novas = [...cartasB];
      novas[index].selecionada = true;
      setCartasB(novas);
      setSegunda(novas[index]);
    }
  }

  if (primeira && segunda) {
    if (primeira.id === segunda.id) {
      // acertou
      const novasA = cartasA.map((c) =>
        c.id === primeira.id ? { ...c, achada: true } : c
      );
      const novasB = cartasB.map((c) =>
        c.id === segunda.id ? { ...c, achada: true } : c
      );
      setCartasA(novasA);
      setCartasB(novasB);
      setMensagem("✅ Acertou!");
    } else {
      // errou
      setTentativas(tentativas - 1);
      setMensagem(`❌ Errou! Tentativas: ${tentativas - 1}`);
    }
    setPrimeira(null);
    setSegunda(null);
  }

  function tentarNovamente() {
    setCartasA(cartasA.map((c) => ({ ...c, selecionada: false })));
    setCartasB(cartasB.map((c) => ({ ...c, selecionada: false })));
    setMensagem("");
  }

  const venceu =
    cartasA.every((c) => c.achada) && cartasB.every((c) => c.achada);
  const perdeu = tentativas <= 0 && !venceu;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🎯 Jogo da Memória</h2>
      <p>Tentativas restantes: {tentativas}</p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h3>Conjunto A</h3>
          {cartasA.map((c, i) => (
            <Carta key={i} item={c} aoClicar={() => clicarCarta("A", i)} />
          ))}
        </div>
        <div>
          <h3>Conjunto B</h3>
          {cartasB.map((c, i) => (
            <Carta key={i} item={c} aoClicar={() => clicarCarta("B", i)} />
          ))}
        </div>
      </div>

      <p>{mensagem}</p>

      {mensagem.includes("Errou") && tentativas > 0 && (
        <button onClick={tentarNovamente}>Tentar novamente</button>
      )}
      {venceu && <p>🎉 Você venceu!</p>}
      {perdeu && <p>💀 Você perdeu!</p>}
    </div>
  );
}
