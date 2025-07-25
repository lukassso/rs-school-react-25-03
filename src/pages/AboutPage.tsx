import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="text-center p-8 rounded-lg bg-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">About This App</h1>
      <p className="text-lg">
        It demonstrates building a React application with functional components,
        hooks, and routing.
      </p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline mt-8 inline-block text-xl"
      >
        Learn more about the RS School React Course
      </a>
    </div>
  );
};

export default AboutPage;
