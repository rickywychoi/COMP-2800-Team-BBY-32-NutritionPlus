import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button, Accordion, Card } from 'react-bootstrap'
import axios from 'axios'
import { GOOGLE_IMAGE_SEARCH_API_KEY, GOOGLE_IMAGE_SEARCH_CX, USDA_API_KEY } from '../../apiKey'
import detailStyles from '../../styles/ItemDetailsPage.module.css'

// daily search limited to 10,000 queries
const GOOGLE_API_URL = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_IMAGE_SEARCH_API_KEY}&cx=${GOOGLE_IMAGE_SEARCH_CX}`

const ItemDetailsPage = () => {
  const router = useRouter()
  const [itemImg, setItemImg] = useState({})
  const [itemName, setItemName] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [result, setResult] = useState({})
  const [nutrients, setNutrients] = useState([])
  const [additionalNutrients, setAdditionalNutrients] = useState(null)
  const [calories, setCalories] = useState({})
  const [foodPortions, setFoodPortions] = useState([])
  // const [gramWeight, setGramWeight] = useState(0)
  
  const FOOD_API_URL = `https://api.nal.usda.gov/fdc/v1/food/${router.query.fdcId}?API_KEY=${USDA_API_KEY}`
  
  useEffect(() => {
    setItemName(router.query.itemname)
    
    // GET request for Food api
    axios.get(FOOD_API_URL).then(res => {
      setResult(res.data)
      setFoodPortions(res.data.foodPortions)
      let newArray = []
      let extraArray = []
      res.data.foodNutrients.forEach(nut => {
        let myNutrient = nut.nutrient
        if (myNutrient.name.localeCompare("Energy") == 0 && myNutrient.unitName.localeCompare("kcal") == 0) {
          setCalories({
            id: myNutrient.id,
            number: myNutrient.number,
            name: myNutrient.name,
            unitName: myNutrient.unitName,
            isExist: true,
            group: "calories"
          })
        }
        if ( myNutrient.name.localeCompare("Total lipid (fat)") == 0
          || myNutrient.name.localeCompare("Fatty acids, total saturated") == 0
          || myNutrient.name.localeCompare("Fatty acids, total trans") == 0
          || myNutrient.name.localeCompare("Cholesterol") == 0
          || myNutrient.name.localeCompare("Sodium, Na") == 0
          || myNutrient.name.localeCompare("Carbohydrates") == 0
          || myNutrient.name.localeCompare("Fiber, total dietary") == 0
          || myNutrient.name.localeCompare("Sugars, total including NLEA") == 0
          || myNutrient.name.localeCompare("Protein") == 0
        ) {
          newArray.push({
            id: myNutrient.id,
            number: myNutrient.number,
            name: myNutrient.name,
            unitName: myNutrient.unitName,
            isExist: true,
            group: "getLessOf"
          })
        } else if ( myNutrient.name.localeCompare("Vitamin D (D2 + D3)") == 0
          || myNutrient.name.localeCompare("Calcium, Ca") == 0
          || myNutrient.name.localeCompare("Iron, Fe") == 0
          || myNutrient.name.localeCompare("Potassium, K") == 0
          ) {
            newArray.push({
              id: myNutrient.id,
              number: myNutrient.number,
              name: myNutrient.name,
              unitName: myNutrient.unitName,
              isExist: true,
              group: "getMoreOf"
            })
          } else if ( myNutrient.name.localeCompare("Vitamin A, RAE") == 0
          || myNutrient.name.localeCompare("Vitamin C, total ascorbic acid") == 0
          || myNutrient.name.localeCompare("Vitamin E (alpha-tocopherol)") == 0
          || myNutrient.name.localeCompare("Vitamin K (phylloquinone)") == 0
          || myNutrient.name.localeCompare("Thiamin") == 0
          || myNutrient.name.localeCompare("Riboflavin") == 0
          || myNutrient.name.localeCompare("Niacin") == 0
          || myNutrient.name.localeCompare("Vitamin B-6") == 0
          || myNutrient.name.localeCompare("Folate, DFE") == 0
          || myNutrient.name.localeCompare("Vitamin B-12") == 0
          || myNutrient.name.localeCompare("Choline, total") == 0
          || myNutrient.name.toLowerCase().includes("biotin")
          || myNutrient.name.localeCompare("Pantothenic acid") == 0
          || myNutrient.name.localeCompare("Phosphorus, P") == 0
          || myNutrient.name.localeCompare("Iodine, I") == 0
          || myNutrient.name.localeCompare("Magnesium, Mg") == 0
          || myNutrient.name.localeCompare("Zinc, Zn") == 0
          || myNutrient.name.localeCompare("Selenium, Se") == 0
          || myNutrient.name.localeCompare("Copper, Cu") == 0
          || myNutrient.name.localeCompare("Manganese, Mn") == 0
          || myNutrient.name.toLowerCase().includes("chromium")
          || myNutrient.name.localeCompare("Molybdenum, Mo") == 0
          || myNutrient.name.toLowerCase().includes("chlori")
          ) {
            extraArray.push({
            id: myNutrient.id,
            number: myNutrient.number,
            name: myNutrient.name,
            unitName: myNutrient.unitName,
            isExist: true,
            group: "additional"
          })
        }
      })
      setNutrients(newArray)
      setAdditionalNutrients(extraArray)
    })

    // GET request for Google image api
    axios.get(GOOGLE_API_URL, {
      params: {
        q: router.query.itemname
      }
    }).then(res => {
      const items = res.data.items
      for (let i = 0; i < items.length; i++) {
        if (items[i].pagemap.cse_thumbnail) {
          setItemImg(items[i].pagemap.cse_thumbnail[0])
          break
        }
      }
    }).catch(err => {
      setErrorMsg(err.message)
    })
  }, [])
  
  const goBack = () => {
    router.back()
  }
  
  const reportWrongImg = () => {
    alert("reported.")
  }
  
  const showErrorMessage = () => {
    setShowErrorMsg(prevState => {
      return !prevState
    })
  }

  console.log(result)
  return (
    <div className={detailStyles.mainBody}>
      <Button variant="secondary" onClick={goBack}>Go back</Button>
      <p>{router.query.fdcId}</p>
      <p>{router.query.itemname}</p>
      {
        !itemImg
          ?
        (
          <div>
            <div className={detailStyles.imgFrame}>
              <img src={itemImg.src} alt={"itemImage of " + itemName} className={detailStyles.img}/>
            </div>
            <span className={detailStyles.report}>
              <p>Is this image inappropriate?</p>
              <a onClick={reportWrongImg} className={detailStyles.reportButton}>Report</a>
            </span>
          </div>
        )
          :
        (
          <div>
            <span className={detailStyles.report}>
              <p><i>Image unavailable due to API issue.</i></p>
              <a onClick={showErrorMessage} className={detailStyles.reportButton}>
                {!showErrorMsg ? "Why?" : "Close"}
              </a>
            </span>
            {
              showErrorMsg
                ?
              <code>{errorMsg}</code>
              :
              null
            }
          </div>
        )
      }
      <div>
        <table className={detailStyles.table}>
          <thead className={detailStyles.thead}>
            <tr>
              <th>Nutrition Facts</th>
              <th></th>
            </tr>
            <tr>
              <th><strong>Servings: </strong>N/A</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={detailStyles.tbody}>
            <tr>
              <td>Amount per serving</td>
              <td></td>
            </tr>
            <tr>
              <td>Calories</td>
              <td>{calories.number}</td>
            </tr>
            <tr>
              <td></td>
              <td>% Daily Value</td>
            </tr>
            {
              nutrients.map(nut => {
                return (
                  nut.group.localeCompare("getLessOf") == 0
                    ?
                  <tr key={nut.id}>
                    <td>
                      <strong>{nut.name}</strong> {nut.number}{nut.unitName}
                    </td>
                    <td>
                      %
                    </td>
                  </tr>
                    :
                  null
                )
              })
            }
          </tbody>
          <tfoot>
          {
              nutrients.map(nut => {
                return (
                  nut.group.localeCompare("getMoreOf") == 0
                    ?
                  <tr key={nut.id}>
                    <td>
                      <strong>{nut.name}</strong> {nut.number}{nut.unitName}
                    </td>
                    <td>
                      %
                    </td>
                  </tr>
                    :
                  null
                )
              })
            }
          </tfoot>
        </table>
        {
          additionalNutrients === null || additionalNutrients.length == 0 
            ?
          null  
            :
          (
            <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Additional nutrients
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                <table className={detailStyles.table}>
                  <tbody className={detailStyles.tbody}>
                    {
                      additionalNutrients.map(nut => {
                        return (
                          nut.group.localeCompare("additional") == 0
                            ?
                          <tr key={nut.id}>
                            <td>
                              <strong>{nut.name}</strong> {nut.number}{nut.unitName}
                            </td>
                            <td>
                              %
                            </td>
                          </tr>
                            :
                          null
                        )
                      })
                    }
                  </tbody>
                </table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            </Accordion>
          )
        }
      </div>
    </div>
  )
}

export default ItemDetailsPage