import React from "react";
import { useModal } from "../../../app/hooks/useModal";
import LinkedInShare from "../common/LinkedInShare";
import FacebookShare from "../common/FacebookShare";
import TwitterShare from "../common/TwitterShare";
import { useDispatch, useSelector } from "react-redux";
import { getIsUnlocked, setIsUnlocked } from "../../../app/store/appState/appSlice";

export const Share = () => {
  const { hideModal } = useModal();
  const dispatch = useDispatch();
  const [shareUrl, setShareUrl] = React.useState("");
  const [validationError, setValidationError] = React.useState("");
  const isAppUnlocked = useSelector(getIsUnlocked);
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

  const handleShare = () => {
    dispatch(setIsUnlocked(true));
  }


  return (
    <div className="max-w-screen-md space-y-6">
      <h1 className="text-xl">Share</h1>


      <div className="space-y-3 text-sm">
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

      </div>

      <div className="flex justify-center space-x-4 ">
        <TwitterShare url={url} text={body} hashtags={[hashtag.replace("#", '')]} onClick={() => dispatch(setIsUnlocked(true))} />
        <FacebookShare url={url} quote={body} hashtag={hashtag} onClick={() => dispatch(setIsUnlocked(true))} />
        <LinkedInShare url={'google.com'} title={title} summary={body} onClick={() => dispatch(setIsUnlocked(true))} />
      </div>

      {/*<div className="border-gray-500 border rounded-xl flex overflow-hidden">
        <input type="text" placeholder="Paste URL to validate post" onChange={handleChange} className="rounded-xl rounded-r-none p-3 px-4 flex-grow" />
        <button className="px-4 bg-green-400 text-white rounded-xl rounded-l-none" onClick={verifyShare}>Verify</button>
      </div>

      {validationError &&
        <p className="text-red-500">{validationError}</p>
      }*/}

      {isAppUnlocked &&
        <p className="text-blue-600 text-center">Thank you for sharing! New features are now unlocked!</p>
      }
    </div>
  );
}