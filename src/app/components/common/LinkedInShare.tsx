import React from 'react';
import { LinkedinLogo } from '@phosphor-icons/react';

interface LinkedInShareProps {
  url: string;
  title: string;
  summary?: string;
  source?: string;
}

const LinkedInShare: React.FC<LinkedInShareProps> = ({ url, title, summary, source }) => {
  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const linkedInUrl = new URL('https://www.linkedin.com/sharing/share-offsite/');
    linkedInUrl.searchParams.append('url', url);
    linkedInUrl.searchParams.append('title', title);
    if (summary) linkedInUrl.searchParams.append('summary', summary);
    if (source) linkedInUrl.searchParams.append('source', source);

    window.open(linkedInUrl.toString(), '_blank', 'width=600,height=600');
  };

  return (
    <button onClick={handleShare} className="inline-flex items-center">
      <LinkedinLogo size={36} weight="fill" color='#0077B5' />
    </button>
  );
};

export default LinkedInShare;