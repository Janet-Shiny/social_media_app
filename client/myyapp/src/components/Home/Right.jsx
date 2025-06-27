import React, { useContext } from 'react';
import { ThemeContext } from '../../App'; 
import { auth } from '../../Auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makereq } from '../../axios';
import { useNavigate } from 'react-router-dom'; 

const Right = () => {
    const { darkTheme } = useContext(ThemeContext);
    const { curruser } = useContext(auth);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    // Fetch suggested users (users not followed by current user)
    const { data: suggestedUsers = [] } = useQuery({
        queryKey: ['suggestedUsers', curruser?.id],
        queryFn: async () => {
            const res = await makereq.get('/users/search?q=');
            // Filter out current user and already followed users
            const followedRes = await makereq.get(`/relationships?follower_userid=${curruser.id}`);
            const followedIds = followedRes.data;
            
            return res.data
                .filter(user => user.id !== curruser.id && !followedIds.includes(user.id))
                .slice(0, 5);
        },
        enabled: !!curruser?.id,
    });

    // Fetch recent activity (latest posts from followed users)
    const { data: recentActivity = [] } = useQuery({
        queryKey: ['recentActivity', curruser?.id],
        queryFn: async () => {
            const res = await makereq.get('/posts');
            return res.data.slice(0, 5);
        },
        enabled: !!curruser?.id,
    });

    // Follow mutation
    const followMutation = useMutation({
        mutationFn: (userId) => makereq.post('/relationships', { userid: userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] });
            queryClient.invalidateQueries({ queryKey: ['followedUsers'] });
        },
    });

    const handleFollow = (userId) => {
        followMutation.mutate(userId);
    };

    const handleNavigateToProfile = (userId) => {
        navigate(`/profile/${userId}`);
    };
    
    return (
        <div className={`hidden lg:flex flex-col w-80 px-4 py-8 ${darkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-l fixed right-0 top-14 h-[calc(100vh-56px)] overflow-y-auto scrollbar-hide`}>
            {/* Suggestions Section */}
            <div className="mb-6">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                    Suggestions for you
                </h3>
                
                {/* Suggestion Items */}
                {suggestedUsers.length > 0 ? (
                    suggestedUsers.map((user) => (
                        <div className="flex items-center justify-between mb-4" key={user.id}>
                            <div 
                                className="flex items-center cursor-pointer"
                                onClick={() => handleNavigateToProfile(user.id)}
                            >
                                <img 
                                    src={user.profile_pic || '/default-profile.png'} 
                                    alt={user.username}
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                                <div>
                                    <p className={`text-sm font-medium ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                                        {user.username}
                                    </p>
                                    <p className={`text-xs ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Suggested for you
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleFollow(user.id)}
                                    disabled={followMutation.isLoading}
                                    className={`text-xs px-3 py-1 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 ${darkTheme ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
                                >
                                    {followMutation.isLoading ? 'Following...' : 'Follow'}
                                </button>
                                <button className={`text-xs px-3 py-1 rounded-md transition-colors ${darkTheme ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                        No suggestions available
                    </p>
                )}
            </div>

            {/* Recent Activity Section */}
            <div className="mb-6">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                    Recent Activity
                </h3>
                
                {/* Activity Items */}
                {recentActivity.length > 0 ? (
                    recentActivity.map((post) => (
                        <div className="flex items-center justify-between mb-3" key={post.id}>
                            <div 
                                className="flex items-center cursor-pointer"
                                onClick={() => handleNavigateToProfile(post.userid)}
                            >
                                <img 
                                    src={post.profile_pic || '/default-profile.png'} 
                                    alt={post.username}
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                                        {post.username}
                                    </p>
                                    <p className={`text-xs ${darkTheme ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                                        {post.desc ? post.desc.substring(0, 30) + '...' : 'Posted something'}
                                    </p>
                                </div>
                            </div>
                            <span className={`text-xs ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                                {new Date(post.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                        No recent activity
                    </p>
                )}
            </div>

            {/* Online Friends Section */}
            <div>
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                    Online Friends
                </h3>
                
                {/* Online Friend Items - Mock data for now */}
                {['Alice Johnson', 'Bob Smith', 'Carol Davis'].map((name, index) => (
                    <div className="flex items-center mb-3 relative" key={index}>
                        <div className="relative">
                            <img 
                                src="/default-profile.png" 
                                alt={name}
                                className="w-8 h-8 rounded-full object-cover mr-3"
                            />
                            <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <p className={`text-sm font-medium ${darkTheme ? 'text-white' : 'text-gray-900'}`}>{name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Right;