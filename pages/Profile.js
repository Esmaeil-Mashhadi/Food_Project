import ProfilePage from '@/components/templates/ProfilePage';
import { useSession } from 'next-auth/react';
import React from 'react';

const Profile = () => {
    
  const session = useSession()
  const {data} = session
  const email = data?.user.email

  

    return (
        <div>
           <ProfilePage email ={email}/>
        </div>
    );
};

export default Profile;