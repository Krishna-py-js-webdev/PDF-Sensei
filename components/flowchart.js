import { useEffect, useRef } from "react";
import mermaid from "mermaid";

const MermaidChart = ({ chartDefinition }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    if (chartRef.current) {
      mermaid.contentLoaded();
    }
  }, [chartDefinition]);

  return <div className="mermaid" ref={chartRef}>{chartDefinition}</div>;
};

export default MermaidChart;
