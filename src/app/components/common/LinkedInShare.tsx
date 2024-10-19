import React from 'react';
import { LinkedinLogo } from '@phosphor-icons/react';
import { openExternalLink } from '../../../helpers/openExternalLink';

interface LinkedInShareProps {
  url: string;
  title: string;
  summary?: string;
  source?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LinkedInShare: React.FC<LinkedInShareProps> = ({ url, title, summary, source, onClick }) => {
  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const linkedInUrl = new URL('https://www.linkedin.com/sharing/share-offsite/');
    linkedInUrl.searchParams.append('url', url);
    linkedInUrl.searchParams.append('title', title);
    if (summary) linkedInUrl.searchParams.append('summary', summary);
    if (source) linkedInUrl.searchParams.append('source', source);
    const stringUrl = linkedInUrl.toString();

    openExternalLink(stringUrl);
    if (onClick) onClick(event);
  };

  return (
    <button onClick={handleShare} className="inline-flex items-center">
      <LinkedinLogo size={64} weight="fill" color='#0077B5' />
    </button>
  );
};

export default LinkedInShare;