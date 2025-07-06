import React from 'react';
import Button from './Button';
import { Navigate, useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const handleClick = () => {
   navigate('/dashboard');
  }
  return (
   
    <div className="container text-light py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to <span className="text-primary">StockVision</span></h1>
        <p className="lead text-secondary">
          Analyze stock trends, visualize performance, and make smart investment decisions.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card bg-dark text-light border border-secondary shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">📊 Market Overview</h5>
              <p className="card-text">Track global indices and stock market trends in real time.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark text-light border border-secondary shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">📈 Performance Graphs</h5>
              <p className="card-text">Visualize historical data and compare performance over time.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark text-light border border-secondary shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🧠 AI Insights</h5>
              <p className="card-text">Get smart predictions and AI-driven analysis for your stocks.</p>
            </div>
          </div>
        </div>
        <div className="col-12 text-center mt-4">
          <Button onClick={handleClick} label="Get Started" variant="solid"  />
        </div>
      </div>
    </div>
  );
};

export default Main;
