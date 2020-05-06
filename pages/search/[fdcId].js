import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { GOOGLE_IMAGE_SEARCH_API_KEY, GOOGLE_IMAGE_SEARCH_CX } from '../../apiKey'
import detailStyles from '../../styles/ItemDetailsPage.module.css'

// daily search limited to 10,000 queries
const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_IMAGE_SEARCH_API_KEY}&cx=${GOOGLE_IMAGE_SEARCH_CX}`

const ItemDetailsPage = () => {
  const router = useRouter()
  const [itemImg, setItemImg] = useState({})
  const [itemName, setItemName] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(false)

  useEffect(() => {
    setItemName(router.query.itemname)
    axios.get(url, {
      params: {
        q: router.query.itemname
      }
    }).then(res => {
      console.log(res)
      const items = res.data.items
      for (let i = 0; i < items.length; i++) {
        if (items[i].pagemap.cse_thumbnail) {
          setItemImg(items[i].pagemap.cse_thumbnail[0])
          break;
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
    console.log("reported")
  }
  
  const showErrorMessage = () => {
    setShowErrorMsg(prevState => {
      return !prevState
    })
  }

  return (
    <div className={detailStyles.mainBody}>
      <Button variant="secondary" onClick={goBack}>Go back</Button>
      <p>{router.query.fdcId}</p>
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
              <p>Image unavailable due to API issue.</p>
              <a onClick={showErrorMessage} className={detailStyles.reportButton}>
                {!showErrorMsg ? "Why?" : "Close"}
              </a>
            </span>
            {
              showErrorMsg
                ?
              <p>{errorMsg}</p>
                :
              null
            }
          </div>
        )
      }
    </div>
  )
}

export default ItemDetailsPage