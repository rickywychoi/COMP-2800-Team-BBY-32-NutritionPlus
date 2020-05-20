// Social Media share buttons in the footer

import {
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";

import {
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const SocialMedia = () => {
  
  const shareUrl = 'https://nutritionplus.herokuapp.com/';
  
  return (
    <>
      <div className="mainBody">
        <p>Share about <i>Nutrition+</i> in: </p>

        <div className="networks">
          <div className="eachNetwork">
            <FacebookShareButton
              url={shareUrl}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>

          <div className="eachNetwork">
            <TwitterShareButton
              url={shareUrl}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

          <div className="eachNetwork">
            <WhatsappShareButton
              url={shareUrl}
              separator=":: "
              className="Demo__some-network__share-button"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
          
          <div className="eachNetwork">
            <LinkedinShareButton 
              url={shareUrl} 
              className="Demo__some-network__share-button">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>

          <div className="eachNetwork">
            <RedditShareButton
              url={shareUrl}
              windowWidth={660}
              windowHeight={460}
              className="Demo__some-network__share-button"
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
          </div>

          <div className="eachNetwork">
            <LineShareButton
              url={shareUrl}
              className="Demo__some-network__share-button"
            >
              <LineIcon size={32} round />
            </LineShareButton>
          </div>
        </div>

      </div>
      
      <style>{`
        .networks {
          display: flex;
          justify-content: center;
        }

        .eachNetwork {
          margin: 0 10px;
        }
      `}</style>
    </>
  )
}

export default SocialMedia