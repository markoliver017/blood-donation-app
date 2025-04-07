import React from 'react';

export default function Page() {
    return (
        <div className="container mx-auto">
            {/* Page Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="card bg-white rounded-lg shadow-md">
                    <div className="card-body p-4">
                        <h3 className="text-lg font-bold">Card Title</h3>
                        <p className="text-gray-600">Card content...</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="card bg-white rounded-lg shadow-md">
                    <div className="card-body p-4">
                        <h3 className="text-lg font-bold">Card Title</h3>
                        <p className="text-gray-600">Card content...</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="card bg-white rounded-lg shadow-md">
                    <div className="card-body p-4">
                        <h3 className="text-lg font-bold">Card Title</h3>
                        <p className="text-gray-600">Card content...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
