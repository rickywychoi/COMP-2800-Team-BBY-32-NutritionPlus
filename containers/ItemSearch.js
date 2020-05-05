// ItemSearch.js

import searchStyles from '../styles/ItemSearch.module.css'
import Link from 'next/link'
import { Form, Pagination } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { USDA_API_KEY } from '../apiKey'

const ItemSearch = () => {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [pagination, setPagination] = useState([])
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?API_KEY=${USDA_API_KEY}`
  
  const handleSearchChange = e => {
    let value = e.target.value
    setSearch(value)
    axios.get(url, {
      params: {
        query: value,
        pageSize: 20
      }
    }).then(
      res => {
        console.log(res.data)
        setResult(res.data.foods)
        setTotalPages(res.data.totalPages)
      }
    )
  }

  const handlePagination = () => {
    console.log("In pagination")
    setPagination([])
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
      <ul className={searchStyles.list}>
        {result.map(item => {
          return (
            <li key={item.fdcId}>
              <Link href="/search/[fdcId]" as={`/search/${item.fdcId}`}>
                <a>
                  {item.description}
                  {item.brandOwner ? " - " + item.brandOwner : null}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
      <Pagination>
        <Pagination.Item onClick={handlePagination}>{1}</Pagination.Item>
        {/* <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last /> */}
      </Pagination>
    </div>
  )
}

export default ItemSearch