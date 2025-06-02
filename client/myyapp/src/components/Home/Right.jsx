import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../App'; 

const Right = () => {
    const { darkTheme } = useContext(ThemeContext);
    
    return (
        <div className={`hidden lg:flex flex-col w-80 px-4 py-8 ${darkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-l fixed right-0 top-14 h-[calc(100vh-56px)] overflow-y-auto scrollbar-hide`}>
            {/* Suggestions Section */}
            <div className="mb-6">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                    Suggestions for you
                </h3>
                
                {/* Suggestion Items */}
                {[1, 2, 3].map((item) => (
                    <div className="flex items-center justify-between mb-4" key={item}>
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${darkTheme ? 'bg-gray-600' : 'bg-gray-300'} mr-3`}></div>
                            <div>
                                <p className={`text-sm font-medium ${darkTheme ? 'text-white' : 'text-gray-900'}`}>John Doe</p>
                                <p className={`text-xs ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>New to Facebook</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className={`text-xs px-3 py-1 rounded-md hover:bg-blue-600 transition-colors ${darkTheme ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
                                Follow
                            </button>
                            <button className={`text-xs px-3 py-1 rounded-md transition-colors ${darkTheme ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                Dismiss
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="mb-6">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                    Recent Activity
                </h3>
                
                {/* Activity Items */}
                {[1, 2, 3].map((item) => (
                    <div className="flex items-center justify-between mb-3" key={item}>
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${darkTheme ? 'bg-gray-600' : 'bg-gray-300'} mr-3`}></div>
                            <div>
                                <p className={`text-sm font-medium ${darkTheme ? 'text-white' : 'text-gray-900'}`}>John Doe</p>
                                <p className={`text-xs ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Posted a new photo</p>
                            </div>
                        </div>
                        <span className={`text-xs ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>1 min ago</span>
                    </div>
                ))}
            </div>

            {/* Online Friends Section */}
            <div>
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                    Online Friends
                </h3>
                
                {/* Online Friend Items */}
                {[1, 2, 3, 4, 5].map((item) => (
                    <div className="flex items-center mb-3 relative" key={item}>
                        <div className="relative">
                            <div className={`w-8 h-8 rounded-full ${darkTheme ? 'bg-gray-600' : 'bg-gray-300'} mr-3`}></div>
                            <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <p className={`text-sm font-medium ${darkTheme ? 'text-white' : 'text-gray-900'}`}>John Don</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Right;