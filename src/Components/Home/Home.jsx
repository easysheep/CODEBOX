import React, { useEffect } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const variants = {
  initial2: { y: 200, x: 0 }, // Initial position is at the bottom
  animate2: {
    y: 0,
    x: 100, // Final position is to the right
    transition: { duration: 1.2 },
  },
};

const Home = () => {
  return (
    <div className="home">
      <div className="hrline1"></div>
      <div className="vrline1"></div>
      <motion.div
        className="heading"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div className="heading-part" variants={containerVariants}>
          <motion.h1 className="h1" variants={childVariants}>
            C
          </motion.h1>
          <motion.h1 className="h1" variants={childVariants}>
            o
          </motion.h1>
          <motion.h1 className="h1" variants={childVariants}>
            d
          </motion.h1>
          <motion.h1 className="h1" variants={childVariants}>
            e
          </motion.h1>
        </motion.div>
        <motion.div className="heading-part" variants={containerVariants}>
          <motion.h1 className="h1" variants={childVariants}>
            B
          </motion.h1>
          <motion.h1 className="h1" variants={childVariants}>
            o
          </motion.h1>
          <motion.h1 className="h1" variants={childVariants}>
            x
          </motion.h1>
        </motion.div>
      </motion.div>
      <div className="buttons">
        <motion.div
          className="btn"
          variants={variants}
          initial="initial2"
          animate="animate2"
        >
          <Link
            to="/editor"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Start Creating
          </Link>
        </motion.div>
        <motion.div
          className="btn"
          variants={variants}
          initial="initial2"
          animate="animate2"
        >
          <Link
            to="/projects"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Projects
          </Link>
        </motion.div>
      </div>
      <div className="vrline2"></div>
      <div className="hrline2"></div>
    </div>
  );
};

export default Home;
