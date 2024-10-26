import React from 'react'

const RecentActivity = () => {
  return (
    <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((activity, index) => (
            <div key={index} className="border bg-white rounded-lg p-4 shadow-lg">
            <p><strong>Received From:</strong> XXX NGO</p>
            <p><strong>Date:</strong> 12/12/12</p>
            <p><strong>Quantity:</strong> 15kg</p>
            <p><strong>Delivery Type:</strong> Self</p>
            <p><strong>Location:</strong> XXX Location</p>
            <img 
                src="https://via.placeholder.com/150" 
                alt="Map placeholder" 
                className="w-full mt-2 rounded"
            />
            </div>
        ))}
    </div>
  </div>
  )
}

export default RecentActivity
