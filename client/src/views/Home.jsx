import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import featuresConfig from "../configs/HomePageFeatures";
import FeatureCard from "../components/HomeFeatureCard";
import { setPageTitle } from '../Utils';
import { motion } from "framer-motion";
import { useEffect } from "react";
import courses from "../configs/HomeCourses";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";

function Home() {
  useEffect(() => {
    setPageTitle({ title: "Home" });
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity }
    }
  };

  const rotateIn = {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.7 } }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="bg-[#020617] text-white overflow-hidden">
      <Navbar />

      <div className="relative">
        <motion.div
          className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 top-10 left-10"
          variants={floating}
          animate="animate"
        />
        <motion.div
          className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 bottom-10 right-10"
          variants={floating}
          animate="animate"
        />

        <motion.div
          className="text-center py-32 px-5 relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-tight"
            variants={slideLeft}
          >
            Build Your Future with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              FutureTech
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
            variants={slideRight}
          >
            Learn in-demand skills with real-world projects, expert mentors, and career guidance.
          </motion.p>

          <motion.div
            className="mt-10 flex justify-center gap-6"
            variants={rotateIn}
          >
            <Button size="lg" title="Explore Courses" onClick={() => navigate("/courses")} />
            <Button variant="secondary" size="lg" title="Contact Us" onClick={() => navigate("/contact")} />
          </motion.div>
        </motion.div>
      </div>

     <motion.div
        className=" px-5 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 className="text-4xl font-bold text-center mb-16" variants={slideLeft}>
          Why Choose Us?
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuresConfig.map((feature) => (
            <motion.div
              key={feature.id}
              variants={rotateIn}
              whileHover={{ scale: 1.08, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="py-20 bg-gradient-to-b from-[#020617] to-[#0F172A]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-5">
          <motion.h2 className="text-4xl font-bold text-center mb-16" variants={slideRight}>
            Popular Courses
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {courses.map((item, index) => (
              <motion.div
                key={index}
                variants={rotateIn}
                whileHover={{ scale: 1.05, y: -15 }}
              >
                <CourseCard
                  {...item}
                  buttonTitle="Explore"
                  onClick={() => navigate("/courses")}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="text-center py-24 bg-gradient-to-r from-blue-600 to-purple-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Start Learning Today 
        </motion.h2>

        <p className="text-gray-200 mb-8">
          Upgrade your skills and build your dream career.
        </p>

        <Button size="lg" title="Get Started" onClick={() => navigate("/courses")} />
      </motion.div>

      <Footer />
    </div>
  );
}

export default Home;

