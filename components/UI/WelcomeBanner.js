import { useRouter } from 'next/router'
import { Button } from 'react-bootstrap'
import bannerStyles from '../../styles/WelcomeBanner.module.css'

const WelcomeBanner = () => {
  const router = useRouter()

  const toQuestionnaire = () => {
    router.push("/questionnaire")
  }

  const toItemSearch = () => {
    router.push("/search")
  }

  // const tomenuQuestionnaire = () => {
  //   router.push("/menuQuestionnaire")
  // }
    
  const toRecipeSearch = () => {
    router.push("/recipe")
  }

  return (
    <div className={bannerStyles.body}>
      <div className={bannerStyles.contents}>
        <h1 className={bannerStyles.head}>Nutrition+</h1>
        <span className={bannerStyles.mainPara}>
          <p className={bannerStyles.p}>
            To fight against <span style={{color: "red", fontSize: "1.3rem"}}>COVID-19</span>
            <img className={bannerStyles.coronaIcon} src="https://img.icons8.com/doodle/48/000000/coronavirus.png"/>
            , we need to <i>eat healthy</i> and stay strong.
          </p>
        </span>
        <div>
          <Button 
            variant="primary" 
            className="mr-2 mb-2" 
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
            className="mr-2 mb-2"
            onClick={toItemSearch}
          >
            Search Grocery Items
          </Button>

          <Button
            variant="primary"
            className="mr-2 mb-2"
            onClick={toRecipeSearch}
          >
            Search Recipes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner