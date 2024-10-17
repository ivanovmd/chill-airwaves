import React from "react";
import { useModal } from "../../../app/hooks/useModal";
import LinkedInShare from "../common/LinkedInShare";
import FacebookShare from "../common/FacebookShare";
import TwitterShare from "../common/TwitterShare";

export const Share = () => {
  const { hideModal } = useModal();
  const [shareUrl, setShareUrl] = React.useState("");
  const hashtag = "#chillairwaves";
  const url = "https://chillairwaves.com";
  const title = "Chill Airwaves";
  const body = "Listen to the best chill music on the internet";


  const verifyShare = async () => {
    const response = await window.electronAPI.verifyShare(shareUrl);
    if (response) {
      alert("Share is valid");
    } else {
      alert("Share is invalid");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShareUrl(e.target.value);
  }


  return (
    <div>
      <h1 className="text-xl">Share</h1>

      <div className="flex justify-center space-x-4">
        <FacebookShare url={url} quote={body} hashtag={hashtag} />

        <LinkedInShare url={'google.com'} title={title} summary={body} />

        <TwitterShare url={url} text={body} hashtags={[hashtag.replace("#", '')]} />
      </div>

      <div>
        <input type="text" placeholder="Validate Shared Post" onChange={handleChange} />
        <button onClick={verifyShare}>Verify</button>
      </div>
    </div>
  );
}