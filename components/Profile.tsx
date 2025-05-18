'use client';
import { config } from '@/lib/config';
import { IKImage } from 'imagekitio-next';
import React from 'react';

const Profile = ({ universityCard }: { universityCard: string }) => {
  return (
    <IKImage
      urlEndpoint={config.env.imagekit.urlEndpoint}
      className="rounded-sm object-fill w-full"
      path={universityCard}
      alt="University ID"
      width={486}
      height={287}
    />
  );
};

export default Profile;