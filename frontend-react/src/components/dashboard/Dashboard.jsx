import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const Dashboard = () => {
  const [ticker, setTicker] = useState('');
  const [plot, setPlot] = useState('');
  const [ma100, setMa100] = useState('');
  const[pred,setPred] = useState('');
  const[mse,setMse] = useState('');
  const[rmse,setRmse] = useState('');
  const[r2,setR2] = useState('');
  // Fetch authenticated user data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/protected/');
        console.log('Dashboard data:', response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle ticker submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/predict/', { ticker });

      console.log('Prediction response:', response.data);

      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const plotUrl = `${backendRoot}${response.data.plot_img}`;
      const ma100Value = `${backendRoot}${response.data.plot_100_dma}`;
      const predValue = `${backendRoot}${response.data.plot_prediction}`;
      setPlot(plotUrl);
      setMa100(ma100Value);
      setPred(predValue);
      setMse(response.data.mse);
      setRmse(response.data.rmse);
      setR2(response.data.r2);
    } catch (error) {
      console.error('Error submitting ticker:', error);
    }
  };

  return (
    <div className="container text-light py-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <label htmlFor="tickerInput" className="form-label">Enter Stock Ticker</label>
            <input
              id="tickerInput"
              type="text"
              className="form-control bg-dark text-light border-secondary"
              placeholder="e.g., AAPL"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100 mt-3 rounded-pill">Predict</button>
          </form>
        </div>

        <div className=" prediction mt-5 ">
          <div className='p-5'>
          {plot ? (
            <>
              <h3 className="mb-3">Prediction Result</h3>
              <img src={plot} alt="Prediction Plot" className="img-fluid rounded border border-secondary" />
            </>
          ) : (
            <h4 className="text-secondary">No prediction yet</h4>
          )}
        </div>
        <div className='p-5'>
          {ma100 ? (
            <>
              <h3 className="mb-3">100 Days Moving Average Result</h3>
              <img src={ma100} alt="Prediction Plot" className="img-fluid rounded border border-secondary" />
            </>
          ) : (
            <h4 className="text-secondary">No prediction yet</h4>
          )}
        </div>
        <div className='p-5'>
          {pred? (
            <>
              <h3 className="mb-3">Final Predicted Result</h3>
              <img src={pred} alt="Prediction Plot" className="img-fluid rounded border border-secondary" />
            </>
          ) : (
            <h4 className="text-secondary">No prediction yet</h4>
          )}
        </div>
        <div className='text-center p-5'>
          <h4>Model Evaluation</h4>
          <p className='text-light'>Mean Squared Error (MSE): {mse}</p>
          <p className='text-light'>Root Mean Squared Error (RMSE): {rmse}</p>
          <p className='text-light'>R-squared (R2): {r2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
