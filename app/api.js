// pages/api/employees.js

export default async function handler(req, res) {
    try {
      // Replace this with your actual API endpoint
      const apiResponse = await fetch('http://localhost:3000/api/employees');
      console.log(apiResponse,90)

      const data = await apiResponse.json();
  console.log(data,90)
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  