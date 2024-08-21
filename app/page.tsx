'use client'
import {BsBell, BsBookmark, BsEnvelope, BsTwitter} from 'react-icons/bs';
import {BiHash, BiHomeCircle, BiMoney, BiUser} from 'react-icons/bi';
import FeedCard from '@/components/FeedCard';
import { SlOptions } from 'react-icons/sl';
import { CredentialResponse, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { graphqlClient } from '@/client/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useCurrentUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
// import { useCurrentUser } from '@/hooks/user';

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: 'Home',
    icon: <BiHomeCircle />
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: 'Messages',
    icon: <BsEnvelope />,
  },
  {
    title: 'Bookmarks',
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />
  },
  {
    title: 'Profile',
    icon: <BiUser />
  },
  {
    title: 'More',
    icon: <SlOptions />
  },
]

export default function Home() {

  const {user} = useCurrentUser()
  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential
    if(!googleToken) return toast.error('Google token not found')
    console.log(googleToken)
  
    const { verifyGoogleToken } = await graphqlClient.request(
      verifyUserGoogleTokenQuery, {token: googleToken}
    );

    toast.success('Verified Success')
    console.log(verifyGoogleToken)

    if(verifyGoogleToken) window.localStorage.setItem('twitter_token', verifyGoogleToken)
    
    await queryClient.invalidateQueries({
      queryKey: ["current-user"]
    });
  }, [queryClient])

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-4 pt-1 ml-28 relative">
          <div className="text-2xl cursor-pointer w-fit p-4 transition-all h-fit hover:bg-gray-600 rounded-full">
            <BsTwitter />
          </div>
          <div className='mt-1 text-xl pr-4'>
            <ul>
              {sidebarMenuItems.map(item => (
                <li className='flex justify-start items-center gap-4 hover:bg-gray-800 w-fit rounded-full px-3 cursor-pointer py-3 mt-2' key={item.title}>
                  <span className='text-3xl'>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className='mt-5 px-3'>
              <button className='bg-[#1d9bf0] py-2 px-4 font-semibold rounded-full text-lg w-full'>
                Tweet
              </button>
            </div>
          </div>
        {user && (
        <div className='absolute bottom-5 flex gap-2 items-center bg-slate-800
        px-3 py-2 rounded-full'>
          {user && user.profileImageURL && (
          <Image 
            className='rounded-full'
            src={user?.profileImageURL} 
            alt='user-image' 
            height={50} 
            width={50} 
          />
          )}
          <div>
            <h3 className='text-xl'>{user.firstName}</h3>
            <h3 className='text-xl'>{user.lastName}</h3>
          </div>
        </div>)}
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-y-scroll border-gray-600">
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          {!user && <div className='p-5 bg-slate-700 rounded-lg'>
            <h1 className='my-2 text-2xl'>New to Twitter</h1>
              <GoogleLogin
                  onSuccess={handleLoginWithGoogle}
              />
          </div>}
        </div>
      </div>
    </div>
  );
}
