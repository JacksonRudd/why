import TrendsGraph from "./TrendsGraph";

function Graph() {
  return (
    <div className="graph">
      <h1>Graph</h1>
      <TrendsGraph keyword={"MlOps"}></TrendsGraph>
      <TrendsGraph keyword={"Kubernetes"}></TrendsGraph>
    </div>
  );
}

export default Graph;
