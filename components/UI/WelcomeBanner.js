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

  const tomenuQuestionnaire = () => {
    router.push("/menuQuestionnaire")
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
          className="mr-2" 
          onClick={toQuestionnaire}
        >
          Calculate Your Required Energy Intake
        </Button>
        <Button 
          variant="primary"
          className="mr-2"
          onClick={toItemSearch}
        >
          Search Grocery Items
        </Button>
        <Button 
          variant="primary"
          className="mr-2" 
          onClick={tomenuQuestionnaire}
        >
          Menu Questionnaire
        </Button>
      </p>
    </Jumbotron>
  )
}

export default WelcomeBanner