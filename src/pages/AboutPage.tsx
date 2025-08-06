import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="text-center p-8 rounded-lg bg-card text-foreground">
      <h1 className="text-4xl font-bold mb-4 text-primary">About This App</h1>
      <p className="text-lg">
        It demonstrates building a React application with functional components,
        hooks, and routing.
      </p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline mt-8 inline-block text-xl"
      >
        Learn more about the RS School React Course
      </a>
    </div>
  );
};

export default AboutPage;
