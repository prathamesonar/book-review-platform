// frontend/src/components/RatingChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RatingChart = ({ reviews }) => {
  // Process the review data
  const data = [
    { name: '1 Star', value: 0 },
    { name: '2 Stars', value: 0 },
    { name: '3 Stars', value: 0 },
    { name: '4 Stars', value: 0 },
    { name: '5 Stars', value: 0 },
  ];

  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      data[review.rating - 1].value++;
    }
  });

  // Filter out ratings with zero reviews to keep the chart clean
  const chartData = data.filter(entry => entry.value > 0);

  // Define colors for each rating. Red for 1-star, green for 5-star.
  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8'].reverse();
  const ratingColors = {
    '1 Star': '#FF8042',
    '2 Stars': '#FFBB28',
    '3 Stars': '#00C49F',
    '4 Stars': '#0088FE',
    '5 Stars': '#8884d8'
  };

  // If there's no data, don't render the chart
  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-80 mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center">Rating Distribution</h3>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip 
            formatter={(value, name) => [`${value} review${value > 1 ? 's' : ''}`, name]}
          />
          <Legend />
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60} // This creates the donut hole
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={ratingColors[entry.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;