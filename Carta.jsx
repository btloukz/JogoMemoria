export default function Carta({ item, aoClicar }) {
  const estilo = {
    border: item.selecionada ? "2px solid red" : "1px solid black",
    backgroundColor: item.achada ? "lightgreen" : "white",
    width: "70px",
    height: "70px",
    margin: "5px",
    fontSize: "25px",
  };

  const mostrar = item.selecionada || item.achada ? item.nome : "*";

  return (
    <button style={estilo} onClick={aoClicar} disabled={item.achada}>
      {mostrar}
    </button>
  );
}
