import { useRouter } from 'next/router'
import { Jumbotron, Button } from 'react-bootstrap'
import Banner from '../../styles/banner.module.css'

const WelcomeBanner = () => {
  const router = useRouter()

  const toQuestionnaire = () => {
    router.push("/questionnaire")
  }

  const toItemSearch = () => {
    router.push("/search")
  }

<<<<<<< HEAD
  const tomenuQuestionnaire = () => {
    router.push("/menuQuestionnaire")
=======
  const toRecipeSearch = () => {
    router.push("/recipe")
>>>>>>> Jason_Cheung_Recipe_Search
  }

  return (
    <Jumbotron className={Banner.body}>
      <h1 className={Banner.head}>Nutrition+</h1>
      <p  className={Banner.p}>
        To fight against COVID-19, we need to <i>eat healthy</i> and stay strong.
      </p>
      <p>
        <Button 
          variant="primary" 
          className="mr-2 mb-2" 
          onClick={toQuestionnaire}
        >
          Calculate Your Required Energy Intake
        </Button>
        <Button 
          variant="primary"
<<<<<<< HEAD
          className="mr-2"
=======
          className="mr-2 mb-2"
>>>>>>> Jason_Cheung_Recipe_Search
          onClick={toItemSearch}
        >
          Search Grocery Items
        </Button>
        <Button 
          variant="primary"
<<<<<<< HEAD
          className="mr-2" 
          onClick={tomenuQuestionnaire}
        >
          Menu Questionnaire
=======
          className="mr-2 mb-2"
          onClick={toRecipeSearch}
        >
          Search Recipes
>>>>>>> Jason_Cheung_Recipe_Search
        </Button>
      </p>
    </Jumbotron>
  )
}

export default WelcomeBanner