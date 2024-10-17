import React from 'react';
import { FacebookLogo } from '@phosphor-icons/react';

interface FacebookShareProps {
  url: string;
  quote?: string;
  hashtag?: string;
}

const FacebookShare: React.FC<FacebookShareProps> = ({ url, quote, hashtag }) => {
  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const facebookUrl = new URL('https://www.facebook.com/sharer/sharer.php');
    facebookUrl.searchParams.append('u', url);
    if (quote) facebookUrl.searchParams.append('quote', quote);
    if (hashtag) facebookUrl.searchParams.append('hashtag', hashtag);

    window.open(facebookUrl.toString(), '_blank', 'width=600,height=600');
  };

  return (
    <button onClick={handleShare} className="inline-flex items-center">
      <FacebookLogo size={36} weight="fill" color='#1877F2' />
    </button>
  );
};

export default FacebookShare;