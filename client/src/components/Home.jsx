import React from 'react';
// import Header from './Header';
import Footer from './home-page/Footer';

const HomePage = () => {
  return (
    <div >
      <Header />
      <main >
        <h1 >Welcome to Our Website</h1>
        <p >
          We are glad to have you here. Explore our content and learn more about what we offer.
        </p>
        <button >Get Started</button>
      </main>
      <Footer />
    </div>
  );
};


export default HomePage;
