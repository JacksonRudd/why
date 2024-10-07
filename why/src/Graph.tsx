import Node from "./Node";
function Graph() {
  return (
    <div className="graph">
      <h1>Graph</h1>
      <Node
        keyword="MlOps"
        startDate={new Date("2022")}
        endDate={new Date("2023")}
      ></Node>
      <Node
        keyword={"kubernetes"}
        startDate={new Date("2022")}
        endDate={new Date("2023")}
      ></Node>
    </div>
  );
}

export default Graph;
