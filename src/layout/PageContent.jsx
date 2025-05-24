import React from 'react';

const PageContent = ({ children }) => {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {children}
    </main>
  );
};

export default PageContent;