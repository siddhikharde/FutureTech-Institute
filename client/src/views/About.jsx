import React from "react";
import {
  GraduationCap,
  Cpu,
  Users,
  Target,
  Award,
  BookOpen,
} from "lucide-react";
import Navbar from "../components/Navbar";

const  statData=[{
  title:"500+",
  subtitle:"Students Trained"
},
{
  title:"20+",
  subtitle:"Professional Courses"
},
{
  title:"25+",
  subtitle:"Live Projects"
},
{
  title:"95%",
  subtitle:"Student Satisfaction"
}]

function StatCard({ title, subtitle }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
      <h3 className="text-2xl font-bold text-[#0EA5E9]">{title}</h3>
      <p className="text-[#4B5563] text-sm">{subtitle}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 hover:shadow-md transition">
      <Icon className="text-[#0EA5E9] mb-3" size={32} />
      <h3 className="text-xl font-semibold text-[#111827] mb-2">
        {title}
      </h3>
      <p className="text-[#4B5563]">{text}</p>
    </div>
  );
}

function ValueCard({ icon: Icon, title, text }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-center hover:shadow-md transition">
      <Icon className="mx-auto mb-3 text-[#0EA5E9]" size={28} />
      <h4 className="font-semibold text-[#111827] mb-2">{title}</h4>
      <p className="text-[#4B5563] text-sm">{text}</p>
    </div>
  );
}



function About() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen">
     <Navbar/>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A]" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            About <span className="text-[#0EA5E9]">FutureTech</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Shaping future-ready professionals through practical,
            industry-focused technology education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {
            statData.map((item, index)=>{
              return(
              <StatCard title={item.title} subtitle={item.subtitle}/>
            )})
          }
        </div>
      </div>

    </div>
  );
}

export default About;
