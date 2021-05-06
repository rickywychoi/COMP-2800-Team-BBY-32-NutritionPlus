/**
 * The welcome banner in the main page. 
 * React Bootstrap Button for buttons to go between features.
 * 
 * Uses icons from icons8.com for easter egg.
 * @see https://icons8.com/icons
 */


import { useRouter } from 'next/router'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import bannerStyles from '../../styles/WelcomeBanner.module.css'

const WelcomeBanner = React.forwardRef((props, ref) => {
  const router = useRouter()
  const [easterClickCount, setEasterClickCount] = useState(0)
  const [easterVisible, setEasterVisible] = useState(false)
  
  
  /********************Easter Egg********************/
  const easterEggIconList = [
    "https://img.icons8.com/doodle/48/000000/coronavirus.png",
    "https://img.icons8.com/bubbles/50/000000/coronavirus.png",
    "https://img.icons8.com/plasticine/100/000000/coronavirus.png",
    "https://img.icons8.com/nolan/64/coronavirus.png",
    "https://img.icons8.com/bubbles/100/000000/protection-mask.png",
    "https://img.icons8.com/clouds/100/000000/protection-mask.png",
    "./static/images/coffin-guys.png"
  ]
  
  // Two clicks on COVID-19 icon in the banner triggers the easter egg
  const easterEggTrigger = (e) => {
    e.preventDefault()
    setEasterClickCount(easterClickCount + 1)
    if (easterClickCount === 1) {
      setEasterVisible(true)
    }
  }

  // Hides the easter egg
  const easterEggHide = (e) => {
    e.preventDefault()
    setEasterVisible(false)
    setEasterClickCount(0)
  }

  // Pushes random icons generated at random positions into the array
  const easterEggImages = []
  function generateEasterImages(arr) {
    for (let i = 0; i < 95; i++) {
      let imageSource = easterEggIconList[Math.floor(Math.random() * easterEggIconList.length)]
      arr.push(
        <img 
          key={i}
          src={imageSource} 
          alt="easterEgg"
          className={imageSource.includes("coffin") ? bannerStyles.easterImgCoffin : bannerStyles.easterImg} 
          style={{
            animationDelay: `${0.5 + i / 20}s`, 
            left: `${randomGeneratorPos(90)}%`,
            top: `${randomGeneratorPos(370)}px`
          }}
        /> 
      )
    }
    return arr
  }

  // random generator of multiples of five
  const randomGeneratorPos = (max) => {
    return Math.round((Math.random() * max) / 5) * 5;
  }
  /*****************End of Easter Egg*****************/

  // routes to the questionnaire page
  const toQuestionnaire = () => {
    router.push("/questionnaire")
  }

  // routes to the grocery item search page
  const toItemSearch = () => {
    router.push("/itemsearch")
  }
    
  // routes to the recipe search page
  const toRecipeSearch = () => {
    router.push("/recipe")
  }

  return (
    <div className={bannerStyles.body} ref={ref}>
      <div className={bannerStyles.contents}>

        {/* if the easter egg is triggered, show randomly generated icons */}
        {easterVisible ? <div>{generateEasterImages(easterEggImages)}</div> : null}

        <h1 className={bannerStyles.head} onClick={easterEggHide}>Nutrition+</h1>
        <span className={bannerStyles.mainPara}>
          <p className={bannerStyles.p}>
            To fight against <span style={{color: "red", fontSize: "1.3rem"}}>COVID-19</span>
            <a onClick={easterEggTrigger}><img className={bannerStyles.coronaIcon} src="https://img.icons8.com/doodle/48/000000/coronavirus.png"/></a>
            , we need to <i>eat healthy</i> and stay strong.
          </p>
        </span>
        <div>
          <Button 
            variant="primary" 
            className={bannerStyles.button} 
            onClick={toQuestionnaire}
            >
            Calculate Your Required Energy Intake
          </Button>     

          <Button 
            variant="primary"
            className={bannerStyles.button} 
            onClick={toItemSearch}
            >
            Search Grocery Items
          </Button>

          <Button
            variant="primary"
            className={bannerStyles.button} 
            onClick={toRecipeSearch}
          >
            Search Recipes
          </Button>
        </div>
      </div>
    </div>
  )
})

export default WelcomeBanner