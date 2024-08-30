import React, { useMemo } from "react";
import * as d3 from "d3";
import { StickyProps } from "src/helpers/pathways/types";
import { motion } from "framer-motion";
import paths from "src/data/pathways/geodata_norway.json";
import cities from "src/data/pathways/cities.json";

//encapsulates all the visualizations
const Sticky = ({
  data,
  distances,
  dimensions,
  index,
  updateIndex,
}: StickyProps) => {
  const { width, height } = dimensions;
  const weeks = 7;

  // get Lines, Points and countries from geojson file
  const pathlines = useMemo(() => {
    return paths.features.filter((d) => d.geometry.type === "LineString");
  }, []);

  const locations = useMemo(() => {
    return paths.features.filter((d) => d.geometry.type === "Point");
  }, []);

  const features = useMemo(() => {
    return data.features.filter((d) =>
      [
        "Norway",
        "Denmark",
        "Sweden",
        "Germany",
        "Poland",
        "Finland",
        "Lithuania",
        "Estonia",
        "Latvia",
        "Belarus",
        "Russia",
        "Netherlands",
        "Iceland",
        "United Kingdom",
        "Belgium",
        "Luxemburg",
        "France",
        "Switzerland",
        "Austria",
        "Italy",
        "Czech Republic",
        "Spain",
        "Romania",
        "Greece",
        "Bulgaria",
        "Hungary",
        "Portugal",
      ].includes(d.properties!.name)
    );
  }, [data]);

  // Map and projection
  const projection = useMemo(() => {
    return d3
      .geoMercator()
      .center([12, 63])
      .scale(width / 1.3)
      .translate([width / 2, height / 2]);
  }, [height, width]);

  // Zoom handling
  const transform = useMemo(() => {
    if (index === undefined) {
      return "translate(0px,0px) scale(1)"; // default
    }

    if (index > 1 && index < locations.length) {
      // transform the long,lat coordinates into x,y of pixels
      const [x0, y0] = projection(
        locations[index].geometry.coordinates as [number, number]
      ) ?? [0, 0]; // ?? is like || but for null or undefined, so in case it should take the default center point 0,0
      // define zooming center and scale
      const centerX = width / 1.7;
      const centerY = height / 2;
      const offsetX = centerX - x0 * 2.5;
      const offsetY = centerY - y0 * 2.5;

      const scale = 2.5;

      return `translate(${offsetX}px,${offsetY}px) scale(${scale})`;
    }
    return "translate(0px,0px) scale(1)"; // default, when index is 0 or 1
  }, [height, index, locations, projection, width]);

  // A path generator
  const pathGenerator = d3.geoPath().projection(projection);

  // calculate d attribute from path for map
  const pathData = useMemo(() => {
    return features.map((feature) => pathGenerator(feature));
  }, [features, pathGenerator]);

  // create city name data
  const cityData = useMemo(() => {
    return cities.map((city) => ({
      name: city.city,
      coordinates: [parseFloat(city.lng), parseFloat(city.lat)],
    }));
  }, []);

  // Scales and Axis for the distance visualization
  const yScale = d3
    .scaleLinear()
    .domain([0, 7000])
    .range([0, height - 150]);

  return (
    <>
      <svg width={width} height={height}>
        <motion.g
          initial={{ transform: "translate(0px,0px) scale(1)" }}
          animate={{ transform: transform }}
          transition={{ duration: 2 }}
        >
          <g>
            {/* Europe Map */}
            {features.map((feature, i) => (
              <path
                key={i}
                d={pathData[i] as string}
                className={feature.properties ? feature.properties.name : ""}
                fill="white"
                stroke={index === 0 ? "#bc5a45" : "#cdcdcd"}
                strokeWidth={0.5}
              />
            ))}
            {/* City Names Norway and Sweden */}
            {cityData.map((city, i) => {
              const [cx, cy] = projection(
                city.coordinates as [number, number]
              ) ?? [0, 0];
              return (
                <motion.text
                  key={i}
                  fill="#8e8e8e"
                  fontSize={index < 2 ? 0 : "4px"}
                  fontFamily="Times New Roman"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index < 2 ? 0 : 1,
                  }}
                  transition={{ duration: 2 }}
                  x={cx}
                  y={cy}
                >
                  {city.name}
                </motion.text>
              );
            })}
            {/* Pathways of my Journey */}
            {pathlines.map((pathline, i) => (
              <motion.path
                d={
                  pathGenerator(
                    pathline.geometry as d3.GeoPermissibleObjects
                  ) as string
                }
                key={i}
                fill="none"
                stroke="black"
                strokeWidth={1}
                animate={{
                  pathLength: index < i + 1 ? 0 : 1,
                }}
                transition={{ duration: index === i + 1 ? 2 : 0 }}
              />
            ))}
            {/* 8 Locations of my Journey, with red highlighting and text */}
            {locations.map((d, i) => {
              const [cx, cy] = projection(
                d.geometry.coordinates as [number, number]
              ) ?? [0, 0];

              return (
                i > 0 && (
                  <React.Fragment key={i}>
                    <motion.circle
                      r="9"
                      fill="#bc5a45"
                      cx={cx}
                      cy={cy}
                      opacity={index === i ? 0.4 : 0}
                      // initial={{ opacity: 0 }}
                      // animate={{
                      //   opacity: index === i ? [0.6, 0.1, 0.6] : 0,
                      // }}
                      // transition={{
                      //   duration: 3,
                      //   repeat: index === i ? Infinity : 0,
                      // }}
                    />

                    <motion.circle
                      r="3"
                      fill="black"
                      stroke="white"
                      strokeWidth={1}
                      opacity={index < i ? 0 : 1}
                      cx={cx}
                      cy={cy}
                    />
                    <motion.text
                      fill="black"
                      fontSize={index < 2 ? 14 : 8}
                      fontFamily="Times New Roman"
                      opacity={index === i ? 1 : 0}
                      x={cx + 20}
                      y={cy - 5}
                    >
                      {d.properties.address}
                    </motion.text>
                  </React.Fragment>
                )
              );
            })}
          </g>
        </motion.g>
        <motion.rect
          x={width / 3.7}
          y={height / 5}
          width={width / 2}
          height={height / 2}
          fill="#bc5a45"
          initial={{ opacity: 0.8 }}
          animate={{
            opacity: index === 0 ? 0.8 : 0,
          }}
          transition={{ duration: 1 }}
        />
        {/* Circles from first page and anchor points on the right side with text */}
        <g transform={`translate(${width / 3},${50})`}>
          {width &&
            height &&
            distances.map((d, i) => {
              const location = locations[i];
              return (
                <React.Fragment key={i}>
                  {i < distances.length - 1 && (
                    <motion.line
                      x1={width / 2}
                      y1={yScale(d)} // y of start circle
                      x2={width / 2}
                      y2={yScale(distances[i + 1])} // y of end circle
                      stroke="black"
                      strokeWidth={2}
                      strokeDasharray={index < i + 1 ? "5,10" : "none"}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: index === 0 ? 0 : 1,
                      }}
                      transition={{ duration: 1 }}
                    />
                  )}
                  {i > 0 && (
                    <motion.text
                      fill="black"
                      fontFamily="Times New Roman"
                      opacity={index === i ? 1 : 0}
                      x={width / 2 + 20}
                      y={yScale(d) + 5}
                    >
                      {d + " km"}
                    </motion.text>
                  )}
                  <motion.circle
                    r="10"
                    fill={index === i && index > 0 ? "#bc5a45" : "black"}
                    onClick={() => {
                      updateIndex(i);
                    }}
                    initial={{
                      cx: i * (width / 3 / locations.length),
                      cy: yScale(4000),
                    }}
                    animate={{
                      cy: index === 0 ? yScale(4000) : yScale(d),
                      cx:
                        index === 0
                          ? i * (width / 3 / locations.length)
                          : width / 2,
                    }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{ cursor: "pointer" }}
                    stroke="none"
                    strokeWidth={0}
                    whileHover={{ stroke: "#bc5a45", strokeWidth: 4 }}
                  >
                    <title>
                      {location.properties.day +
                        ": " +
                        location.properties.address}
                    </title>
                  </motion.circle>
                </React.Fragment>
              );
            })}
          {Array.from({ length: 2 }).map((_, i) => (
            <circle
              key={i}
              opacity={index === 0 ? 1 : 0}
              cx={i * (width / 3 / locations.length)}
              cy={yScale(3000)}
              r="10"
              fill="black"
            />
          ))}
          <UnitText
            x={width / 3 / locations.length + 30}
            y={yScale(3000) + 10}
            count="2"
            item="Countries"
            index={index}
          />
          {Array.from({ length: weeks }).map((_, i) => (
            <circle
              key={i}
              opacity={index === 0 ? 1 : 0}
              cx={i * (width / 3 / locations.length)}
              cy={yScale(3500)}
              r="10"
              fill="black"
            />
          ))}
          <UnitText
            x={(distances.length - 2) * (width / 3 / locations.length) + 30}
            y={yScale(3500) + 10}
            count="7"
            item="Weeks"
            index={index}
          />

          <UnitText
            x={(distances.length - 1) * (width / 3 / locations.length) + 30}
            y={yScale(4000) + 10}
            count="8"
            item="Locations"
            index={index}
          />
        </g>
      </svg>
    </>
  );
};

/*
 * component for text in the unit chart
 */
function UnitText({
  x,
  y,
  count,
  item,
  index,
}: {
  x: number;
  y: number;
  count: string;
  item: string;
  index: number | undefined;
}) {
  return (
    <motion.text
      fill="black"
      opacity={index === 0 ? 1 : 0}
      x={x}
      y={y}
      style={{
        fontSize: "1.7vw",
        fontFamily: "'Times New Roman', cursive",
      }}
    >
      <tspan fill="#cdcdcd">{count}</tspan>
      &nbsp;{item}
    </motion.text>
  );
}

export default Sticky;
