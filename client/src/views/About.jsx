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


      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#111827] mb-4">
              Who We Are
            </h2>
            <p className="text-[#4B5563] mb-4">
              <strong>FutureTech</strong> is a modern technology institute
              dedicated to bridging the gap between academic learning and
              real-world industry needs.
            </p>
            <p className="text-[#4B5563]">
              We focus on hands-on training, real projects, and mentorship
              that helps students build confidence and careers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <ul className="space-y-4 text-[#111827]">
              <li className="flex items-center gap-3">
                <BookOpen className="text-[#0EA5E9]" />
                Practical Learning Approach
              </li>
              <li className="flex items-center gap-3">
                <Cpu className="text-[#0EA5E9]" />
                Latest Technologies
              </li>
              <li className="flex items-center gap-3">
                <Award className="text-[#0EA5E9]" />
                Industry Certifications
              </li>
              <li className="flex items-center gap-3">
                <Users className="text-[#0EA5E9]" />
                Expert Faculty & Mentors
              </li>
            </ul>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default About;
