import { Button } from 'react-bootstrap'
import cartStyles from '../styles/MyCart.module.css'
import { useRouter } from 'next/router'

const MyCart = () => {
  const router = useRouter()
  
  const goBack = () => {
    router.replace("/search")
  }

  return (
    <div className={cartStyles.mainBody}>
      <Button variant="secondary" onClick={goBack}>Back to Search</Button>
      <p>MyCart.</p>
    </div>
  )
}

export default MyCart