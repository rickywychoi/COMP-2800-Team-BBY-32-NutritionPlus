import { useRouter } from 'next/router'
import { Jumbotron, Button } from 'react-bootstrap'

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
=======
  const toRecipeSearch = () => {
>>>>>>> Brian_Seo_MealComposition
    router.push("/menuQuestionnaire")
  }

  return (
    <Jumbotron>
      <h1>Nutrition+</h1>
      <p>
        To fight against COVID-19, we need to <i>eat healthy</i> and stay strong.
      </p>
      <p>
        <Button 
          variant="primary" 
          className="mr-2" 
          onClick={toQuestionnaire}
        >
          Calculate Your Required Energy Intake
        </Button>
        <Button 
          variant="primary"
<<<<<<< HEAD
          className="mr-2"
=======
          className = "mr-2"
>>>>>>> Brian_Seo_MealComposition
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
          className = "mr-2"
          onClick={toRecipeSearch}
        >
          Search a Meal
>>>>>>> Brian_Seo_MealComposition
        </Button>
      </p>
    </Jumbotron>
  )
}

export default WelcomeBanner