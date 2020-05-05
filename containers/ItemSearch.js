import searchStyles from '../styles/ItemSearch.module.css'
import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'


const ItemSearch = () => {
  const [search, setSearch] = useState()
  useEffect(() => {

  })

  const handleSearchChange = e => {
    setSearch(e.target.value)
  }

  return (
    <div className={searchStyles.body}>
      <Form>
        <Form.Group controlId="formBasicPassword">
          <Form.Control 
            type="text" 
            placeholder="Search items..."
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default ItemSearch