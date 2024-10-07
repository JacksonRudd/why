import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    trends: any;
  }
}

interface TrendsGraphProps {
  keyword: string;
}

const TrendsGraph: React.FC<TrendsGraphProps> = ({ keyword }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRendered = useRef(false); // Add a flag to prevent multiple renders

  useEffect(() => {
    if (hasRendered.current) return; // Prevent multiple initializations

    // Dynamically create a script element to load the Google Trends library
    const script = document.createElement("script");
    script.src =
      "https://ssl.gstatic.com/trends_nrtr/3826_RC01/embed_loader.js";
    script.type = "text/javascript";
    script.async = true;

    // Append the script to the container element
    const container = containerRef.current;
    container?.appendChild(script);

    // Once the script is loaded, render the Google Trends widget within the container
    script.onload = () => {
      if (window.trends && window.trends.embed && container) {
        window.trends.embed.renderExploreWidgetTo(
          container,
          "TIMESERIES",
          {
            comparisonItem: [
              { keyword: keyword, geo: "US", time: "2004-01-01 2024-10-07" },
            ],
            category: 0,
            property: "",
          },
          {
            exploreQuery: `date=all&geo=US&q=${keyword}&hl=en`,
            guestPath: "https://trends.google.com:443/trends/embed/",
          }
        );
      }
    };

    hasRendered.current = true; // Set the flag to true after rendering

    return () => {
      // Cleanup: Remove the script when the component unmounts
      if (container?.contains(script)) {
        container.removeChild(script);
      }
    };
  }, [keyword]);

  return (
    <div className="trends-graph-container" ref={containerRef}>
      {/* Google Trends will render here */}
    </div>
  );
};

export default TrendsGraph;
