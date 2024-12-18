import React from 'react';
import { FacebookLogo } from '@phosphor-icons/react';
import { openExternalLink } from '../../../helpers/openExternalLink';

interface FacebookShareProps {
  url: string;
  quote?: string;
  hashtag?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FacebookShare: React.FC<FacebookShareProps> = ({ url, quote, hashtag, onClick }) => {
  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const facebookUrl = new URL('https://www.facebook.com/sharer/sharer.php');
    facebookUrl.searchParams.append('u', url);
    if (quote) facebookUrl.searchParams.append('quote', quote);
    if (hashtag) facebookUrl.searchParams.append('hashtag', hashtag);
    const stringUrl = facebookUrl.toString();

    openExternalLink(stringUrl);
    if (onClick) onClick(event);
  };

  return (
    <button onClick={handleShare} className="inline-flex items-center">
      <FacebookLogo size={64} weight="fill" color='#1877F2' />
    </button>
  );
};

export default FacebookShare;