import Link from 'next/link'
import { Table, Accordion,Button, Card} from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {  EDAMAM_RECIPE_API_KEY } from '../../apiKey'
import RecipeStyles from '../../styles/RecipeDetails.module.css'

const RecipeDetails = () => { 
  // const router = useRouter()
  // // console.log(router)
  // // console.log(router.query.facid)

    const url = `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_b79327d05b8e5b838ad6cfd9576b30b6&app_id=6b733ca0&app_key=${EDAMAM_RECIPE_API_KEY}`
    
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
     

     console.log(result)
     console.log(ing)
     console.log(nutrients)
    

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
        <Link href={''+ result.url}><a>See Directions</a></Link> 
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
        <Link href='/'><a>Back to Search</a></Link>
        
             

    </div>
  )
}

export default RecipeDetails