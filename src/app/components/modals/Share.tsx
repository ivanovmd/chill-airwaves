import React from "react";
import { useModal } from "../../../app/hooks/useModal";
import LinkedInShare from "../common/LinkedInShare";
import FacebookShare from "../common/FacebookShare";
import TwitterShare from "../common/TwitterShare";

export const Share = () => {
  const { hideModal } = useModal();
  const [shareUrl, setShareUrl] = React.useState("");
  const [validationError, setValidationError] = React.useState("");
  const hashtag = "#chillairwaves";
  const url = "https://chillairwaves.com";
  const title = "Chill Airwaves";
  const body = "Listen to the best chill music on the internet";


  const verifyShare = async () => {
    const response = await window.electronAPI.verifyShare(shareUrl);
    if (response) {
      setValidationError("");
    } else {
      setValidationError("Share is invalid");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShareUrl(e.target.value);
  }


  return (
    <div className="max-w-screen-md">
      <h1 className="text-xl mb-6">Share</h1>


      <div className="space-y-3 mb-6 text-sm">
        <p>
          Love the vibes? Share ChillAirWaves and get access to exclusive features!
        </p>

        <p>
          Share your ChillAirWaves experience on Twitter, Facebook, or LinkedIn. Don't forget to include <span className="text-blue-600 font-bold">#chillairwaves</span> and <span className="text-blue-600 font-bold">chillairwaves.com</span>!
        </p>

        {/*<p>
          Copy the URL of your post and paste it in the Verify field below.
        </p>

        <p>
          Once verified, you'll unlock:
        </p>*/}

        <p>
          After sharing, you'll unlock:
        </p>

        <p>
          <ul className="space-y-1 list-disc ml-6">
            <li>
              More airports to choose from
            </li>
            <li>
              Track skipping
            </li>
            <li>
              Extra cool themes
            </li>
          </ul>
        </p>
      </div>

      <div className="flex justify-center space-x-4 ">
        <TwitterShare url={url} text={body} hashtags={[hashtag.replace("#", '')]} />
        <FacebookShare url={url} quote={body} hashtag={hashtag} />
        <LinkedInShare url={'google.com'} title={title} summary={body} />
      </div>

      {/*<div className="border-gray-500 border rounded-xl flex overflow-hidden">
        <input type="text" placeholder="Paste URL to validate post" onChange={handleChange} className="rounded-xl rounded-r-none p-3 px-4 flex-grow" />
        <button className="px-4 bg-green-400 text-white rounded-xl rounded-l-none" onClick={verifyShare}>Verify</button>
      </div>

      {validationError &&
        <p className="text-red-500">{validationError}</p>
      }*/}
    </div>
  );
}