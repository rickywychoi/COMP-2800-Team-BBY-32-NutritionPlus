/**
 * Social Media share buttons in the footer.
 * 
 * Uses react-share.
 * @see https://www.npmjs.com/package/react-share
 */

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

        {/* Facebook */}
        <div className="networks">
          <div className="eachNetwork">
            <FacebookShareButton
              url={shareUrl}
              className="Demo__some-network__share-button"
              >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>

          {/* Twitter */}
          <div className="eachNetwork">
            <TwitterShareButton
              url={shareUrl}
              className="Demo__some-network__share-button"
              >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

          {/* WhatsApp */}
          <div className="eachNetwork">
            <WhatsappShareButton
              url={shareUrl}
              separator=":: "
              className="Demo__some-network__share-button"
              >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
          
          {/* LinkedIn */}
          <div className="eachNetwork">
            <LinkedinShareButton 
              url={shareUrl} 
              className="Demo__some-network__share-button">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>

          {/* Reddit */}
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

          {/* Line */}
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
      
      {/* Stylesheet for Social Network icons */}
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