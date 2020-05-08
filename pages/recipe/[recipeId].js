import { useRouter } from 'next/router'

const RecipeDetailsPage = () => {
  const router = useRouter()
  console.log(router)
  return (
    <div>
      {/* <p>{router.query.fdcId}</p> */}
      <p>{router.query.recipeId}</p>
      <p>{router.query.search}</p>
    </div>
  )
}

export default RecipeDetailsPage