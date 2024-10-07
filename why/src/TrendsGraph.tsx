import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    trends: any;
  }
}

interface TrendsGraphProps {
  keyword: string;
  startDate: Date;
  endDate: Date;
}

const TrendsGraph: React.FC<TrendsGraphProps> = ({
  keyword,
  startDate,
  endDate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRendered = useRef(false); // Add a flag to prevent multiple renders

  useEffect(() => {
    // Clear the container to prevent multiple widgets
    if (hasRendered.current) return; // Prevent multiple initializations

    const container = containerRef.current;
    if (container) {
      container.innerHTML = "";
    }

    // Dynamically create a script element to load the Google Trends library
    const script = document.createElement("script");
    script.src =
      "https://ssl.gstatic.com/trends_nrtr/3826_RC01/embed_loader.js";
    script.type = "text/javascript";
    script.async = true;

    // Append the script to the container element
    container?.appendChild(script);

    // Once the script is loaded, render the Google Trends widget within the container
    script.onload = () => {
      if (window.trends && window.trends.embed && container) {
        const formatDate = (date: Date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        const timeRange = `${formatDate(startDate)} ${formatDate(endDate)}`;

        window.trends.embed.renderExploreWidgetTo(
          container,
          "TIMESERIES",
          {
            comparisonItem: [{ keyword: keyword, geo: "US", time: timeRange }],
            category: 0,
            property: "",
          },
          {
            exploreQuery: `date=${timeRange}&geo=US&q=${encodeURIComponent(
              keyword
            )}&hl=en`,
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
  }, [keyword, startDate, endDate]);

  return (
    <div className="trends-graph-container" ref={containerRef}>
      {/* Google Trends will render here */}
    </div>
  );
};

export default TrendsGraph;
