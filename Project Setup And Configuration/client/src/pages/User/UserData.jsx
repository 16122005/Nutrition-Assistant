import { useState, useEffect } from 'react';
import axios from 'axios';

const UserData = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://nutrition-assistant-2.onrender.com/users');
      setUserData(response.data[0]); 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <h2>User Data</h2>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
};

export default UserData;
