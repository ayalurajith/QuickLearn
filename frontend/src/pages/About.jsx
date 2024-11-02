import React from 'react';
import Layout from '../components/layout/Layout';
import { FaUsers, FaLightbulb,FaBook, FaHandsHelping } from 'react-icons/fa';

// You can replace this URL with any other image URL from Unsplash or similar sites.
const aboutImage = 'https://st2.depositphotos.com/3591429/10566/i/450/depositphotos_105666254-stock-photo-business-people-at-meeting-and.jpg';

const About = () => {
  return (
  <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <Layout title={'About Us - Quick Learn'}>
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-semibold mt-6 mb-4 text-center rounded  bg-gradient-to-r from-red-500 to-blue-500">About Quick Learn</h1>
            <img src={aboutImage} alt="About Quick Learn" className="w-full h-48 object-cover rounded-md mb-4" />

            <p className="mb-4">
                Quick Learn was established in 2024 with a mission to help aspiring candidates succeed in their Public Service Commission (PSC) exams. With a focus on delivering quality educational resources, we provide comprehensive study materials, quizzes, and interactive sessions that help students excel.
            </p>

            <p className="mb-4">
                Our platform is designed for individuals who are dedicated to achieving their career goals in the public sector. At Quick Learn, we bring together expert tutors, carefully curated content, and a supportive community to help you on your journey to success.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center p-4 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-md shadow-md">
                    <FaBook className="h-8 w-8 mr-2" />
                    <span>Quality Content</span>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-md shadow-md">
                    <FaLightbulb className="h-8 w-8 mr-2" />
                    <span>Expert Guidance</span>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-md shadow-md">
                    <FaUsers className="h-8 w-8 mr-2" />
                    <span>Community Support</span>
                </div>
            </div>
        </div>
    </Layout>
</div>

  );
}

export default About;
