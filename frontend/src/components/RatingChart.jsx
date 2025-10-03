import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RatingChart = ({ reviews }) => {
  const data = [
    { name: '1 Star', count: 0 },
    { name: '2 Stars', count: 0 },
    { name: '3 Stars', count: 0 },
    { name: '4 Stars', count: 0 },
    { name: '5 Stars', count: 0 },
  ];

  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      data[review.rating - 1].count++;
    }
  });

  return (
    <div className="w-full h-64 mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center">Rating Distribution</h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#4a90e2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;