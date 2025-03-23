import React from "react";
import img from "../images/img.png";

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={img} className="max-w-sm rounded-xl shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">
              Optimize your resume
              <br />
              to get more interviews
            </h1>
            <h2 className="text-2xl py-6">
              Crafted with insights from top recruiters, our AI-powered resume
              builder helps you create professional, ATS-friendly resumes
              instantly. 🚀
            </h2>
            <a href="/form">
              <button className="btn btn-primary">Get Started</button>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer bg-base-300 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a href="/about" className="link link-hover">
            About us
          </a>
          <a href="/contact" className="link link-hover">
            Contact
          </a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
    </>
  );
};

export default LandingPage;
