import { useRouter } from 'next/router'

const RecipeDetailsPage = () => {
  const router = useRouter()
  console.log(router)
  return (
    <div>
      <p>{router.query.fdcId}</p>
    </div>
  )
}

export default RecipeDetailsPage