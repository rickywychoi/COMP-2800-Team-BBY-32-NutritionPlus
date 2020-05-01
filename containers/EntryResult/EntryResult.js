// EntryResult.js

import resultStyles from './EntryResult.module.css'
import Link from 'next/link'

const EntryResult = (props) => {
  return (
    <>
      <div className={resultStyles.body}>
        <h3>Your average dietary energy intake is <i>{props.eer}</i> kcal/day.</h3>
        <br />
        <Link href="/"><a>Back to home</a></Link>
      </div>
    </>
  )
}

export default EntryResult