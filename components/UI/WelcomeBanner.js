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
          onClick={toItemSearch}
        >
          Search Grocery Items
        </Button>
      </p>
    </Jumbotron>
  )
}

export default WelcomeBanner