import axios from 'axios'
import { useState, setState } from 'react'
import Link from 'next/link'
import { Form, Button } from 'react-bootstrap'
import menuQuestionnaireStyles from '../styles/menuQuestionnaire.module.css'
import { EDAMAM_RECIPE_APP_ID, EDAMAM_RECIPE_APP_KEY } from '../apiKey'

const MenuQuestionnaire = () => {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([]) 
    let value

    const url = `https://api.edamam.com/search?&app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}`

    const handleSearchInput = event => {
        // console.log('This happens when you change the text')
        // console.log(value)
        value = event.target.value
        setSearch(value)
    }

    const handleSearchQuery = e => {
        console.log(search);
        let results = []
        axios.get(url, {
          params: {
            q: search,
            // pageSize: 20
          }
        }).then(
          res => {
            console.log(res.data)
            // console.log(res.data.hits)
            res.data.hits.forEach(item => results.push(item))
            setResult(results)
          }
        )
    }

    return (
        <div className={menuQuestionnaireStyles.body}>
            <h1 className = {menuQuestionnaireStyles.title}>Enter a Recent Meal..</h1>
            <div className = {menuQuestionnaireStyles.searchContainer}>
                <Form>
                    <Form.Group controlId="formBasicPassword" className = {menuQuestionnaireStyles.search}>
                        <Form.Control 
                            type="text" 
                            placeholder="Search Menu..."
                            onChange = {handleSearchInput}
                        />
                    </Form.Group>
                </Form>
                <Button
                 className = {menuQuestionnaireStyles.button}
                 onClick = {handleSearchQuery}>
                    Search
                </Button>
            </div>
            
        </div>
    )
}

export default MenuQuestionnaire;