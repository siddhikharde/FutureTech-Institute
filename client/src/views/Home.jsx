import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import featuresConfig from "../configs/HomePageFeatures";
import FeatureCard from "../components/HomeFeatureCard";

function Home (){
  const navigate=useNavigate();
  return (
    <div className="bg-[#F8FAFC]">

      <Navbar/>
      <div className="bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-5 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Learn Skills for the Future with <span className="text-[#38BDF8]">FutureTech</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Industry-ready courses, expert trainers, and recorded lectures.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg"title={"Explore Courses"} onClick={()=>{
                navigate("/courses")
            }} />
            <Button variant="secondary" size="lg" title={"Contact Us"}
            onClick={()=>navigate("/contact")}/>

          </div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-5 p-10">
          {featuresConfig.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

    </div>
  );
};

export default Home;
