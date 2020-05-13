import orderStyles from '../styles/MyOrder.module.css'

const MyOrder = () => {
  return (
    <div className={orderStyles.mainBody}>
      
      <h3>Review &amp; Pay</h3>
      <p>List of grocery items</p>
      <p>List of Available store</p>
      <button>Confirm</button>
    </div>
  )
}

export default MyOrder