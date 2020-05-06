import { Form, Button } from 'react-bootstrap'
import menuQuestionnaireStyles from '../styles/menuQuestionnaire.module.css'
import { useRouter } from 'next/router'
import { EDAMAM_RECIPE_APP_ID, EDAMAM_RECIPE_APP_KEY } from '../apiKey'

const MenuQuestionnaire = () => {

    return (
        <div className={menuQuestionnaireStyles.body}>
            <h1>Search Bar</h1>
        </div>
    )
}

export default MenuQuestionnaire;