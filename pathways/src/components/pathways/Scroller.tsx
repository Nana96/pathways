/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import classes from "./Scroller.module.css";
import Sticky from "./Sticky"; // visualizations in the background
import worldGeoJson from "src/data/pathways/world.json";
import { Scrollama as Scrollama_, Step as Step_ } from "react-scrollama";
import { motion } from "framer-motion";
import { useResizeObserver } from "src/helpers/hooks/use-resize-observer";
import Popover from "./Popover";

type StepData = {
  index: number;
};

const Step = Step_<StepData>;
const Scrollama = Scrollama_<StepData>;
const getScrollamaStepSelector = (index: number) => {
  return `div[data-react-scrollama-id='react-scrollama-${index}']`;
};
const getCountryName = (country: string) => {
  return document.querySelector(`path.${country}`);
};

const margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 60,
};

const Scroller = () => {
  const [step, setStep] = useState<StepData>();
  //Update step index when user clicks on anchor points on the right
  const updateIndex = (index: number) => {
    const el = document.querySelector(getScrollamaStepSelector(index));

    if (!el) {
      console.error(`Step ${index} not found`);
      return;
    }

    const yOffset = (el.clientHeight - window.innerHeight) * 0.5;
    const top = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top });
  };

  //hightlight norway or sweden when hover over text
  const handleMouseEnterStrokeHighlight = (name: string) => {
    const node = getCountryName(name);
    if (node) {
      node.setAttribute("fill", "#bc5a45");
      node.setAttribute("opacity", "0.8");
    }
  };

  const handleMouseLeaveStrokeHighlight = (name: string) => {
    const node = getCountryName(name);
    if (node) {
      node.setAttribute("fill", "white");
      node.setAttribute("opacity", "1");
    }
  };

  // array to show distances on the right side
  const distances = [0, 473, 994, 2051, 3087, 3458, 4680, 6337];

  // define dimensions
  const [chartDivRef, width, height] = useResizeObserver<HTMLDivElement>();

  return (
    <div className={classes.container}>
      <motion.div ref={chartDivRef} className={classes.vis} id="vis">
        {/* Vis component */}
        <Sticky
          data={worldGeoJson as GeoJSON.FeatureCollection}
          distances={distances}
          dimensions={{ width, height, margin }}
          index={step?.index ?? 0}
          updateIndex={updateIndex}
        />
      </motion.div>
      <div className={classes.graphic} id="graphic">
        {/* Text sections that move and trigger vis via scrolling */}
        <Scrollama
          offset={0.5}
          onStepEnter={({ data }) => {
            setStep(data);
          }}
        >
          <Step data={{ index: 0 }} key={0}>
            <div
              className={classes.step}
              style={{
                fontSize: "3vw",
                lineHeight: "3rem",
                marginRight: "0vw",
                marginLeft: "33vw",
                marginTop: "20vh",
              }}
            >
              <div style={{ height: "70vh" }}>
                Pathways through Scandinavia
                <br />
                <p style={{ fontSize: "1vw", textAlign: "start" }}>
                  A project by Nastasja Steinhauer
                </p>
              </div>
            </div>
          </Step>
          <Step data={{ index: 1 }} key={1}>
            <div className={classes.step}>
              <div className={classes.date}>Day 5</div>
              <div className={classes.title}>
                Join me on an adventure through Scandinavia: Stormy Seas at
                Falkenberg in Sweden
              </div>
              On July 12, 2023 I began my journey with my camper through{" "}
              <span
                onMouseEnter={() => handleMouseEnterStrokeHighlight("Sweden")}
                onMouseLeave={() => handleMouseLeaveStrokeHighlight("Sweden")}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#bc5a45",
                }}
              >
                Sweden
              </span>{" "}
              and{" "}
              <span
                onMouseEnter={() => handleMouseEnterStrokeHighlight("Norway")}
                onMouseLeave={() => handleMouseLeaveStrokeHighlight("Norway")}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#bc5a45",
                }}
              >
                Norway
              </span>
              . Little did I know that I would traverse over 6000 kilometers in
              about 7 weeks, all on my own. Along the way, I explored more than
              50 destinations. In this narrative, I am delighted to share with
              you a curated selection of 8 locations. The first stop brings us
              to Falkenberg, Sweden, where I experienced a {""}{" "}
              <Popover
                transform={{ top: 30, left: 0 }}
                align={"start"}
                content={
                  <img
                    src="/data/img/stormy.JPG"
                    alt="Stormy Sea"
                    style={{
                      width: "30vw",
                      height: "20vw",
                    }}
                  />
                }
                spanText={"stormy night by the sea"}
              />
              .
            </div>
          </Step>
          <Step data={{ index: 2 }} key={2}>
            <div className={classes.step}>
              <div className={classes.date}>Day 14</div>
              <div className={classes.title}>
                Friends visit in Drammen, Norway
              </div>
              One destination I couldn't miss is the home of my Norwegian
              friend, whom I befriended during my semester abroad.
              {""}{" "}
              <Popover
                transform={{ top: 150, left: 0 }}
                content={
                  <img
                    src="/data/img/drammen.JPG"
                    alt="Drammen"
                    style={{
                      width: "30vw",
                      height: "20vw",
                    }}
                  />
                }
                spanText={"Drammen"}
              />
              , the 5th largest city in Norway, retains a cozy charm despite its
              proximity to Oslo. Nestled among small mountains and lush forests,
              Drammen is bisected by the Drammensfjord waterway. The town's
              claim to fame lies in the renowned Aass brewery.
            </div>
          </Step>
          <Step data={{ index: 3 }} key={3}>
            <div className={classes.step}>
              <div className={classes.date}>Day 18</div>
              <div className={classes.title}>
                Sandy Beaches Await at Stad, Norway
              </div>
              The municipality of Stad in western Norway is renowned for its
              stunning {""}{" "}
              <Popover
                transform={{ top: 150, left: 0 }}
                content={
                  <img
                    src="/data/img/hoddevika.jpg"
                    alt="Hoddevik Beach"
                    style={{
                      width: "30vw",
                      height: "20vw",
                    }}
                  />
                }
                spanText={"sandy beaches"}
              />{" "}
              like Hoddevik or Ervik, offering ideal conditions for surfing
              enthusiasts. It is also known for its dramatic weather patterns
              and rich cultural heritage. On the sacred island of Selja you can
              explore the monastery ruins. St. Sunniva is Norway's only female
              saint.
            </div>
          </Step>
          <Step data={{ index: 4 }} key={4}>
            <div className={classes.step}>
              <div className={classes.date}>Day 23</div>
              <div className={classes.title}>
                Hundreds of Islands Surrounding Stokkvågen, Norway
              </div>
              Nestled within the coastal and mountainous region of Helgeland in
              northern Norway lies the charming village of Stokkvågen. I
              couldn't decide whether I should visit the 2,000-metre-high
              mountains, the beautiful coastline with {""}{" "}
              <Popover
                transform={{ top: 60, left: 0 }}
                content={
                  <img
                    src="/data/img/helgeland.jpg"
                    alt="Helgeland Islands"
                    style={{
                      width: "30vw",
                      height: "20vw",
                    }}
                  />
                }
                spanText={"countless small islands"}
              />
              , the glaciers or the fjords that surround the region.
            </div>
          </Step>
          <Step data={{ index: 5 }} key={5}>
            <div className={classes.step}>
              <div className={classes.date}>Day 37</div>
              <div className={classes.title}>
                Kvalvika Beach in Lofoten, Norway
              </div>
              One of the most famous national park beaches in Lofoten is
              {""}{" "}
              <Popover
                transform={{ top: 160, left: 0 }}
                content={
                  <img
                    src="/data/img/kvalvika.jpg"
                    alt="Kvalvika Beach"
                    style={{
                      width: "30vw",
                      height: "20vw",
                    }}
                  />
                }
                spanText={"Kvalvika Beach"}
              />
              . Characterized by steep, towering mountains, contrasting against
              the black sand and turquoise waters, it offers a stunning natural
              landscape. It is particularly popular as it can be reached in just
              2 hours on foot and it's an ideal spot for camping overnight on
              the beach.
            </div>
          </Step>
          <Step data={{ index: 6 }} key={6}>
            <div className={classes.step}>
              <div className={classes.date}>Day 59</div>
              <div className={classes.title}>
                Ancient Forest and the Seacoast in Skuleskogen National Park,
                Sweden
              </div>
              Skuleskogen National Park is one of the many ancient national
              parks in Sweden. It offers a unique blend of dense spruce forests,
              serene lakes, and rugged {""}{" "}
              <Popover
                transform={{ top: 60, left: -60 }}
                content={
                  <img
                    src="/data/img/skuleskogen1.JPG"
                    alt="Skuleskogen National Park"
                    style={{
                      width: "30vw",
                      height: "20vw",
                    }}
                  />
                }
                spanText={"seacoasts"}
              />
              . It was the perfect place for me to go for a trail run and cool
              off in the refreshing Baltic Sea.
            </div>
          </Step>
          <Step data={{ index: 7 }} key={7}>
            <div className={classes.step}>
              <div className={classes.date}>Day 72</div>
              <div className={classes.title}>
                And the Journey Comes to an End
              </div>
              After an unforgettable 72 days, traversing 6337 kilometers, and
              countless memories etched into my soul, I bid farewell to
              Scandinavia as September draws to a close in 2023. With each step,
              I've collected impressions, a few bruises on my feet from rugged
              hikes, and a heart filled with gratitude for the opportunity to
              embark on this incredible journey. Until we meet again,
              Scandinavia - thank you for the adventure. See you soon {":)"}
              <p
                style={{
                  lineHeight: "0.8rem",
                  fontSize: "0.7rem",
                  marginTop: "30px",
                }}
              >
                <strong>Credit</strong>
                <br />
                This project was created as part of my internship at{" "}
                <a
                  href="https://www.interactivethings.com/"
                  style={{ textDecoration: "underline" }}
                >
                  Interactive Things
                </a>
                . I would like to thank Patrick Browne and Bartosz Prusinowski
                for their patience and guidance. And to Kerstin Faye for her
                design support.
                <br />
                The design was inspired by the visual narrative{" "}
                <a
                  href="http://www.storiesbehindaline.com/"
                  style={{ textDecoration: "underline" }}
                >
                  The Stories behind a Line
                </a>{" "}
                by Federica Fragapane and Alex Piacentini.
              </p>
            </div>
          </Step>
        </Scrollama>
        <div id="extra-space"></div>
      </div>
    </div>
  );
};

export default Scroller;
