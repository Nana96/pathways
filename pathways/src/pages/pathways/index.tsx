/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";
import styles from "./styles.module.css";
import Scroller from "src/components/pathways/Scroller";

const Page = () => {
  return (
    <>
      <Head>
        <script>history.scrollRestoration = "manual"</script>
      </Head>
      <Scroller />
    </>
  );
};
export default Page;
