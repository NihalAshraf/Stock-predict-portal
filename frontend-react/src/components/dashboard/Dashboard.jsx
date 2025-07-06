import React,{useEffect} from 'react'

import axiosinstance from '../../axiosInstance';
const Dashboard = () => {
    // const accessToken = localStorage.getItem('access');
    useEffect(()=>{
        const fetchData=async () => {
            try {
                const response=await axiosinstance.get('/protected-view/')
                // ,{
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`
                //     }

                // }
                console.log('Dashboard data:', response.data);
                
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                
            }
        }
        fetchData();
    },[])
  return (
    <div>
      <h1 className="text-center text-light mt-5">Welcome to Your Dashboard</h1>
    </div>
  )
}

export default Dashboard
