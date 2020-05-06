import { Form, Button } from 'react-bootstrap'
import menuQuestionnaireStyles from '../styles/menuQuestionnaire.module.css'
import { useRouter } from 'next/router'
import { EDAMAM_RECIPE_APP_ID, EDAMAM_RECIPE_APP_KEY } from '../apiKey'

const MenuQuestionnaire = () => {
    /* const query
    const url = `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}` */
    const router = useRouter()
    const goBack = () => {
        router.back()
    }

    return (
        <div className={menuQuestionnaireStyles.body}>
            <div className={menuQuestionnaireStyles.header}>
                <Button variant="secondary" onClick={goBack}>Go back</Button>
                <h1 className={menuQuestionnaireStyles.mainTitle}>Evaluate today's menu choices</h1>
            </div>
            <div className = {menuQuestionnaireStyles.row}>
                <div className = {menuQuestionnaireStyles.col}>
                    <div className = {menuQuestionnaireStyles.card}>
                        <img className = {menuQuestionnaireStyles.img} src = 'https://via.placeholder.com/150' alt = 'placeholder1'/>
                        <h3>Card 1</h3>
                        <p>Placeholder text 1</p>
                        <p>Placeholder text 2</p>
                    </div>
                </div>

                <div className = {menuQuestionnaireStyles.col}>
                    <div className = {menuQuestionnaireStyles.card}>
                        <img className = {menuQuestionnaireStyles.img} src = 'https://via.placeholder.com/150' alt = 'placeholder2'/>
                        <h3>Card 2</h3>
                        <p>Placeholder text 1</p>
                        <p>Placeholder text 2</p>
                    </div>
                </div>

                <div className = {menuQuestionnaireStyles.col}>
                    <div className = {menuQuestionnaireStyles.card}>
                        <img className = {menuQuestionnaireStyles.img} src = 'https://via.placeholder.com/150' alt = 'placeholder3'/>
                        <h3>Card 3</h3>
                        <p>Placeholder text 1</p>
                        <p>Placeholder text 2</p>
                    </div>
                </div>

                <div className = {menuQuestionnaireStyles.col}>
                    <div className = {menuQuestionnaireStyles.card}>
                        <img className = {menuQuestionnaireStyles.img} src = 'https://via.placeholder.com/150' alt = 'placeholder4'/>
                        <h3>Card 4</h3>
                        <p>Placeholder text 1</p>
                        <p>Placeholder text 2</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuQuestionnaire;