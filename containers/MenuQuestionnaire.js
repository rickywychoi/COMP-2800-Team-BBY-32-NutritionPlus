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
    // console.log('EDAMAM_RECIPE_APP_ID:', EDAMAM_RECIPE_APP_ID);
    // console.log('EDAMAM_RECIPE_APP_KEY:', EDAMAM_RECIPE_APP_KEY);
    const url = `https://api.edamam.com/search?&app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}`

    const handleSearchInput = event => {
        // console.log('This happens when you change the text')
        value = event.target.value
        setSearch(value)
    }

    const findValue = a => {
        console.log(value)
    }

    const handleSearchQuery = e => {
        // console.log(e.target.value)
        console.log(typeof search);
        axios.get(url, {
          params: {
            q: search,
            // pageSize: 20
          }
        }).then(
          res => {
            console.log(res.data)
            setResult(res.data.recipe)
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
            <Button className = {menuQuestionnaireStyles.button}
                    onClick = {findValue}>Value</Button>
            <ul className={menuQuestionnaireStyles.list}>
                {result.map(item => {
                return (
                    <li key={item.fdcId}>
                    <Link href="/search/[fdcId]" as={`/search/${item.fdcId}`}>
                        <a>
                        {item.description}
                        {item.brandOwner ? " - " + item.brandOwner : null}
                        </a>
                    </Link>
                    </li>
                )
                })}
            </ul>
        </div>
    )
}

export default MenuQuestionnaire;