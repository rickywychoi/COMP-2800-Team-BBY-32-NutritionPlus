import { Button } from 'react-bootstrap'
import orderhistoryStyles from '../styles/OrderHistory.module.css'
import buttonStyles from '../styles/buttons.module.css'

const OrderHistory = () => {
  return (
    <div className={orderhistoryStyles.mainBody}>
      <div className={orderhistoryStyles.buttonsWrapper}>
        <Button variant="secondary" className={buttonStyles.button} onClick={() => router.back()}>Back to Search</Button>
      </div>
      History
    </div>
  )
}

export default OrderHistory