import React, { useContext } from 'react';
import {
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  MoreHoriz as MoreHorizIcon,
  Place as PlaceIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import Posts from '../../posts/Posts';
import { ThemeContext } from '../../App';
import Share from '../../Share';
import { auth } from '../../Auth';
import { useQuery,useQueryClient,useMutation} from '@tanstack/react-query';
import { makereq } from '../../axios';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const { darkTheme } = useContext(ThemeContext);
  const { curruser } = useContext(auth);
  const userid = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['user', userid],
    queryFn: () =>
      makereq.get('/users/find/' + userid).then(res => res.data),
    enabled: !!userid,
  });
  const {  data: relationshipData = [] } = useQuery({
    queryKey: ['relationship', curruser.id, userid],
    queryFn: () =>
      makereq.get('/relationships?follower_userid='+ curruser.id).then((res) =>{ return res.data}),
    enabled: !!userid && !!curruser.id,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) {
        return makereq.delete('/relationships?userid='+userid );
      }
      return makereq.post('/relationships', { userid });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationship', curruser.id, userid] });
    },
  });

  const handleFollow = () => {
    // Ensure both values are numbers for proper comparison
    const profileUserId = parseInt(userid);
    const isCurrentlyFollowing = relationshipData.includes(profileUserId);
    console.log('Current user ID:', curruser.id);
    console.log('Profile user ID:', profileUserId);
    console.log('Relationship data (users I follow):', relationshipData);
    console.log('Is currently following:', isCurrentlyFollowing);
    mutation.mutate(isCurrentlyFollowing);
  };




  if (isLoading || !data) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <div className={`max-w-3xl mx-auto rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg
      ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>

      <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative">
        <div className="absolute -bottom-16 left-6">
          <div className={`h-32 w-32 rounded-full border-4 ${darkTheme ? 'border-gray-800' : 'border-white'} overflow-hidden shadow-lg`}>
            <img
              src={data.profile_pic || "/default-profile.png"}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-20 px-6 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.username}</h1>
            <div className="flex flex-wrap gap-4 mt-2">
              {data.cit && (
                <div className="flex items-center">
                  <PlaceIcon fontSize="small" className="mr-1" />
                  {data.cit}
                </div>
              )}
              {data.website && (
                <div className="flex items-center">
                  <LanguageIcon fontSize="small" className="mr-1" />
                  <a href={data.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {data.website}
                  </a>
                </div>
              )}
            </div>
            <div className="mt-4 flex gap-3 flex-wrap">
              {isLoading ? (
                "Loading...."
              ) : userid === curruser.id ? (
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg">
                  Update
                </button>
              ) : (
                <button 
                  onClick={handleFollow} 
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading 
                    ? "Loading..." 
                    : relationshipData.includes(parseInt(userid)) 
                      ? "Following" 
                      : "Follow"
                  }
                </button>
              )}
              <button className={`px-6 py-2 rounded-full font-medium transition-all 
                ${darkTheme ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Message
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="p-3 rounded-full">
              <EmailIcon />
            </button>
            <button className="p-3 rounded-full">
              <MoreHorizIcon />
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-4 flex-wrap">
          <a href="#" className="p-3 rounded-full"><FacebookIcon /></a>
          <a href="#" className="p-3 rounded-full"><LinkedInIcon /></a>
          <a href="#" className="p-3 rounded-full"><InstagramIcon /></a>
        </div>
      </div>

      <div className={`${darkTheme ? 'bg-gray-900' : 'bg-gray-50'} pt-4`}>
        <Share />
        <Posts userid={userid}/>
      </div>
    </div>
  );
};

export default Profile;
