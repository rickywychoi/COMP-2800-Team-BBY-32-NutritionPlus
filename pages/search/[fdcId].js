import { useRouter } from 'next/router'

const ItemDetailsPage = () => {
  const router = useRouter()
  console.log(router)
  return (
    <div>
      <p>{router.query.fdcId}</p>
    </div>
  )
}

export default ItemDetailsPage