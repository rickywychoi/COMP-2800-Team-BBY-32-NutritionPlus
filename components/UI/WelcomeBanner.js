import { useRouter } from 'next/router'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import bannerStyles from '../../styles/WelcomeBanner.module.css'

const WelcomeBanner = () => {
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
    "/images/coffin-guys.png"
  ]
  
  const easterEggTrigger = (e) => {
    e.preventDefault()
    setEasterClickCount(easterClickCount + 1)
    if (easterClickCount === 4) {
      setEasterVisible(true)
    }
  }

  const easterEggHide = (e) => {
    e.preventDefault()
    setEasterVisible(false)
    setEasterClickCount(0)
  }

  const easterEggImages = []
  function generateEasterImages(arr) {
    for (let i = 0; i < 95; i++) {
      let imageSource = easterEggIconList[Math.floor(Math.random() * easterEggIconList.length)]
      arr.push(
        <img 
          src={imageSource} 
          alt="easterEgg"
          className={imageSource.includes("coffin") ? bannerStyles.easterImgCoffin : bannerStyles.easterImg} 
          style={{
            animationDelay: `${0.5 + i / 20}s`, 
            left: `${randomGeneratorPos(90)}%`,
            top: `${randomGeneratorPos(50)}%`
          }}
        /> 
      )
    }
    return arr
  }

  // random generator of mutliples of 5
  const randomGeneratorPos = (max) => {
    return Math.round((Math.random() * max) / 5) * 5;
  }
  /*************************************************/

  const toQuestionnaire = () => {
    router.push("/questionnaire")
  }

  const toItemSearch = () => {
    router.push("/search")
  }
    
  const toRecipeSearch = () => {
    router.push("/recipe")
  }

  const toGroceryStores = () => {
    router.push("/stores")
  }

  return (
    <div className={bannerStyles.body}>
      <div className={bannerStyles.contents}>
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
          {/* <Button 
            variant="primary"
            className="mr-2 mb-2" 
            onClick={tomenuQuestionnaire}
            >
            Menu Questionnaire
          </Button> */}
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
          <Button
            variant="primary"
            className={bannerStyles.button}
            onClick={toGroceryStores}
          >
            See Stores
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner