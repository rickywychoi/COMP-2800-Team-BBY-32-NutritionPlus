/**
 * Social Media share buttons in the footer.
 * 
 * Uses react-share.
 * @see https://www.npmjs.com/package/react-share
 */

import Router from 'next/router'
import { Component } from 'react'

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

class SocialMedia extends Component {
  state = {
    currentUrl: ""
  }

  componentDidMount() {
    if (Router.router.asPath) {
      this.setState({
        currentUrl: `https://nutritionplus.herokuapp.com${Router.router.asPath}`
      })
    }
  }

  render() {
    
    // sets current path as it changes
    if (Router.events) {
      Router.events.on('routeChangeComplete', () => {
        console.log(Router.router.asPath)
        this.setState({
          currentUrl: `https://nutritionplus.herokuapp.com${Router.router.asPath}`
        })
      })
    }

    return (
      <>
        <div className="mainBody">
          <p>Share about <i>Nutrition+</i> in: </p>
  
          <div className="networks">
          {
            // if current path is detected, use it as sharing url
            this.state.currentUrl
              ?
            <>
              {/* Facebook */}
              <div className="eachNetwork">
                <FacebookShareButton
                  url={this.state.currentUrl}
                  className="Demo__some-network__share-button"
                  >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
  
              {/* Twitter */}
              <div className="eachNetwork">
                <TwitterShareButton
                  url={this.state.currentUrl}
                  className="Demo__some-network__share-button"
                  >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
  
              {/* WhatsApp */}
              <div className="eachNetwork">
                <WhatsappShareButton
                  url={this.state.currentUrl}
                  separator=":: "
                  className="Demo__some-network__share-button"
                  >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
              
              {/* LinkedIn */}
              <div className="eachNetwork">
                <LinkedinShareButton 
                  url={this.state.currentUrl} 
                  className="Demo__some-network__share-button">
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
  
              {/* Reddit */}
              <div className="eachNetwork">
                <RedditShareButton
                  url={this.state.currentUrl}
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
                  url={this.state.currentUrl}
                  className="Demo__some-network__share-button"
                >
                  <LineIcon size={32} round />
                </LineShareButton>
              </div>
            </>
              :
            null
          }
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

}

export default SocialMedia