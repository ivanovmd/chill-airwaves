import React from 'react';
import { TwitterLogo } from '@phosphor-icons/react';
import { openExternalLink } from '../../../helpers/openExternalLink';

interface TwitterShareProps {
  url: string;
  text?: string;
  hashtags?: string[];
  via?: string;
}

const TwitterShare: React.FC<TwitterShareProps> = ({ url, text, hashtags, via }) => {
  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const twitterUrl = new URL('https://twitter.com/intent/tweet');
    twitterUrl.searchParams.append('url', url);
    if (text) twitterUrl.searchParams.append('text', text);
    if (hashtags && hashtags.length > 0) twitterUrl.searchParams.append('hashtags', hashtags.join(','));
    if (via) twitterUrl.searchParams.append('via', via);
    const stringUrl = twitterUrl.toString();

    openExternalLink(stringUrl);
  };

  return (
    <button onClick={handleShare} className="inline-flex items-center">
      <TwitterLogo size={64} weight="fill" color='#1DA1F2' />
    </button>
  );
};

export default TwitterShare;