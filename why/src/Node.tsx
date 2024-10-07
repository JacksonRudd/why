import Draggable from "react-draggable";
import TrendsGraph from "./TrendsGraph";

interface NodeProps {
  keyword: string;
  startDate: Date;
  endDate: Date;
}

const Node: React.FC<NodeProps> = (node_props) => {
  return (
    <Draggable>
      <div className="node">
        <h1>{node_props.keyword}</h1>
        <TrendsGraph
          keyword={node_props.keyword}
          startDate={node_props.startDate}
          endDate={node_props.endDate}
        />
      </div>
    </Draggable>
  );
};

export default Node;
