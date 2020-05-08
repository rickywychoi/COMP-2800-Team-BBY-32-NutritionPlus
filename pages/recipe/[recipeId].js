import Link from 'next/link'
import { Table, Accordion,Button, Card} from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {  EDAMAM_RECIPE_APP_ID  } from '../../apiKey'
import {  EDAMAM_RECIPE_APP_KEY } from '../../apiKey'
import RecipeStyles from '../../styles/RecipeDetails.module.css'

// const RecipeDetailsPage = () => {
//   // const router = useRouter()
//   // console.log(router)
//   return (
//     <div>
//       <p>{router.query.recipeId}</p>
//       <p>{router.query.search}</p>
//     </div>
//   )
// }

const RecipeDetails = () => { 
  const router = useRouter()
  const str = router.asPath
  const idJimmy = str.substring(56)
  const id = router.query.recipeId
  
    const url = `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}&app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}`
    
    const [result, setResult] = useState({})
    const [ing, setIng] = useState([])
    const [nutrients,setNutrients] = useState({})
    
    useEffect(()=>{
      axios.get(url).then(
          res => {
          setResult(res.data[0])
          setIng(res.data[0].ingredientLines)
          setNutrients(res.data[0].totalNutrients)
             })  
     }, [])
     
  return (

    <div  className={RecipeStyles.body}>
        <img src={result.image} className={RecipeStyles.img} />
        <br />
        <h3><i>{result.label}</i></h3>
        <br />
        <h4>{Math.ceil(result.calories)} Calories</h4>
        <br />
        <h5>Ingredients</h5>
        <ul className={RecipeStyles.list}>
            {ing.map(ing => {
                return (
                    <li key={ing}>{ing}</li>
                 )
            })}
        </ul>
        <br />
        
        <a href = {''+result.url} target="_blank">See Directions</a>

        <Accordion defaultActiveKey="0" className="mt-4">
          
            <Accordion.Toggle as={Button} variant="outline-primary" eventKey="1" className={RecipeStyles.accordionButton}>
                Click to see nutrients composition
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
                <div className={RecipeStyles.dvResult}>
                    <div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                           <tbody>                           
                            {
                              Object.values(nutrients).slice(1).map(nut => {
                                return (
                                  <tr>
                                    <td>{nut.label}</td>
                                    <td>{Math.ceil(nut.quantity)} {nut.unit}</td>
                                  </tr>
                                )
                              })
                            }

                          </tbody>  
                        </Table>
                      <p>g = Grams; mg = Milligrams; µg = Micrograms</p>
                    </div>              
                </div>
            </Accordion.Collapse>                             
        </Accordion>
        <br />
        <Link href={router.query.prevPage}><a>Back to Search</a></Link>
        
    </div>
  )
}

export default RecipeDetails