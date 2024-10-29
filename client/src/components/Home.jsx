import React from 'react';
// import Header from './Header';
import Footer from './home-page/Footer';
import About from './home-page/About';
import Logo from './Logo';
const Home = () => {
  return (
    <div >
      <Logo/>
      <main >
        <h1 >Welcome to Our Website</h1>
        <p >
          We are glad to have you here. Explore our content and learn more about what we offer.
        </p>
        <button >Get Started</button>
      </main>
      <About/>
      <Footer />
    </div>
  );
};


export default Home;
