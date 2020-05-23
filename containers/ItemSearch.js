/**
 * Searches a grocery item from the USDA API and displays its nutritional facts.
 * 
 * Uses bootstrap's Form for the search field and Pagination to help with navigating
 * through larger queries.
 * 
 * Form
 * @see https://react-bootstrap.github.io/components/forms/
 * 
 * Pagination
 * @see https://react-bootstrap.github.io/components/pagination/
 */


import searchStyles from '../styles/ItemSearch.module.css'
import listStyles from '../styles/SearchList.module.css'
import Link from 'next/link'
import { Form, Pagination } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { USDA_API_KEY } from '../apiKey'

const ItemSearch = () => {
  // search query
  const [search, setSearch] = useState("")
  // an array that contains result of items from query
  const [result, setResult] = useState([])
  // an array that contains Pagination components
  const [pagination, setPagination] = useState([])
  // total pages in pagination
  const [totalPages, setTotalPages] = useState()

  // USDA FDC API url with API key
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?API_KEY=${USDA_API_KEY}`
  
  // displays 15 items per page
  const pageSizeLimit = 15
  const searchLimit = 10000

  // obtains values from API by using search as query and pageSize to display 15 results per page
  const handleSearchChange = e => {
    e.preventDefault()
    let value = e.target.value
    setSearch(value)
    let results = []

    // HTTP GET request
    axios.get(url, {
      params: {
        query: value,
        pageSize: pageSizeLimit
      }
    }).then(res => {
      res.data.foods.forEach(item => results.push(item))
      setResult(results)
      let maxPage = res.data.totalPages

      // if the result goes over the search limit, it cuts down the maximum number of available pages
      if (res.data.totalPages * pageSizeLimit > searchLimit) {
        maxPage = Math.ceil(searchLimit / pageSizeLimit)
      }
      setTotalPages(maxPage)
      if (maxPage > 5) {
        // console.log("over five")
        let paginationItems = []
        for (let number = 1; number <= 5; number++) {
          paginationItems.push(
            <Pagination.Item 
            key={number} 
            onClick={() => {handlePagination(number, maxPage, value)}}
            active={1 === number}
            >
              {number}
            </Pagination.Item>
          )
        }
        paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(1, maxPage, value)}}/>)
        setPagination(paginationItems)
      } else {
        // console.log("under five")
        let paginationItems = []
        for (let number = 1; number <= maxPage; number++) {
          paginationItems.push(
            <Pagination.Item 
            key={number} 
            onClick={() => {handlePagination(number)}}
            active={1 === number}
            >
              {number}
            </Pagination.Item>
          )
        }
        setPagination(paginationItems)
      }
    })
  }

  // << arrow
  const handleFirst = (number, totalPages, value) => {
    const prevNumber = number - 5
    if (prevNumber > 0) {
      let results = []
      
      // HTTP GET request
      axios.get(url, {
        params: {
          query: value,
          pageSize: pageSizeLimit,
          pageNumber: prevNumber
        }
      }).then(res => {
        res.data.foods.forEach(item => results.push(item))
        setResult(results)
      })
      let paginationItems = []
      if (prevNumber > 3) {
        paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(prevNumber, totalPages, value)}}/>)
        paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(prevNumber, totalPages, value)}}/>)
        paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, value)}}>{1}</Pagination.Item>)
        paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
        for (let i = prevNumber - 2; i <= prevNumber + 2; i++) {
          paginationItems.push(
            <Pagination.Item 
              key={i} 
              onClick={() => {handlePagination(i, totalPages, value)}}
              active={prevNumber === i}
            >
              {i}
            </Pagination.Item>
          )
        }
        paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
        paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, value)}}>{totalPages}</Pagination.Item>)
        paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(prevNumber, totalPages, value)}}/>)
        paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(prevNumber, totalPages, value)}}/>)
        setPagination(paginationItems)
      }
    }
  }

  // < arrow
  const handlePrev = (number, totalPages, value) => {
    const prevNumber = number - 1
    let results = []

    // HTTP GET request
    axios.get(url, {
      params: {
        query: value,
        pageSize: pageSizeLimit,
        pageNumber: prevNumber
      }
    }).then(res => {
      res.data.foods.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    if (prevNumber > totalPages - 3) {
      paginationItems.push(<Pagination.Prev key="less" onClick={() => {handlePrev(prevNumber, totalPages, value)}}/>)
      for (let i = totalPages - 4; i <= totalPages; i++) {
        paginationItems.push(
          <Pagination.Item 
          key={i} 
          onClick={() => {handlePagination(prevNumber, totalPages, value)}}
          active={prevNumber === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      setPagination(paginationItems)
    }
    if (prevNumber > 3 && prevNumber <= totalPages - 3) {
      paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(prevNumber, totalPages, value)}}/>)
      paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(prevNumber, totalPages, value)}}/>)
      paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, value)}}>{1}</Pagination.Item>)
      paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
      for (let i = prevNumber - 2; i <= prevNumber + 2; i++) {
        paginationItems.push(
          <Pagination.Item 
            key={i} 
            onClick={() => {handlePagination(i, totalPages, value)}}
            active={prevNumber === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
      paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, value)}}>{totalPages}</Pagination.Item>)
      paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(prevNumber, totalPages, value)}}/>)
      paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(prevNumber, totalPages, value)}}/>)
      setPagination(paginationItems)
    }
    if (prevNumber <= 3) {
      for (let number = 1; number <= 5; number++) {
        paginationItems.push(
          <Pagination.Item 
          key={number} 
          onClick={() => {handlePagination(number, totalPages, value)}}
          active={prevNumber === number}
          >
            {number}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(prevNumber, totalPages, value)}}/>)
      setPagination(paginationItems)
    }
  }

  // first page
  const handleNumberOne = (totalPages, value) => {
    let results = []
    const numberOne = 1

    // HTTP GET request
    axios.get(url, {
      params: {
        query: value,
        pageSize: pageSizeLimit,
        pageNumber: numberOne
      }
    }).then(res => {
      res.data.foods.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    for (let number = 1; number <= 5; number++) {
      paginationItems.push(
        <Pagination.Item 
        key={number} 
        onClick={() => {handlePagination(number, totalPages, value)}}
        active={1 === number}
        >
          {number}
        </Pagination.Item>
      )
    }
    paginationItems.push(<Pagination.Next key="more" onClick={() => {handleNext(numberOne, totalPages, value)}}/>)
    setPagination(paginationItems)
  }

  // last number
  const handleNumberLast = (totalPages, value) => {
    let results = []
    const numberLast = totalPages

    // HTTP GET request
    axios.get(url, {
      params: {
        query: value,
        pageSize: pageSizeLimit,
        pageNumber: numberLast
      }
    }).then(res => {
      res.data.foods.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    paginationItems.push(<Pagination.Prev key="less" onClick={() => {handlePrev(numberLast, totalPages, value)}}/>)
    for (let number = totalPages - 4; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item 
        key={number} 
        onClick={() => {handlePagination(number, totalPages, value)}}
        active={numberLast === number}
        >
          {number}
        </Pagination.Item>
      )
    }
    setPagination(paginationItems)
  }

  // > arrow
  const handleNext = (number, totalPages, value) => {
    let nextNumber = number + 1
    let results = []

    // HTTP GET request
    axios.get(url, {
      params: {
        query: value,
        pageSize: pageSizeLimit,
        pageNumber: nextNumber
      }
    }).then(res => {
      res.data.foods.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    if (nextNumber < 4) {
      for (let number = 1; number <= 5; number++) {
        paginationItems.push(
          <Pagination.Item 
          key={number} 
          onClick={() => {handlePagination(nextNumber, totalPages, value)}}
          active={nextNumber === number}
          >
            {number}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Next key="more" onClick={() => {handleNext(nextNumber, totalPages, value)}}/>)
      setPagination(paginationItems)
    }
    if (nextNumber >= 4 && nextNumber < totalPages - 2) {
      paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(nextNumber, totalPages, value)}}/>)
      paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(nextNumber, totalPages, value)}}/>)
      paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, value)}}>{1}</Pagination.Item>)
      paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
      for (let i = nextNumber - 2; i <= nextNumber + 2; i++) {
        paginationItems.push(
          <Pagination.Item 
            key={i} 
            onClick={() => {handlePagination(i, totalPages, value)}}
            active={nextNumber === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
      paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, value)}}>{totalPages}</Pagination.Item>)
      paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(nextNumber, totalPages, value)}}/>)
      paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(nextNumber, totalPages, value)}}/>)
      setPagination(paginationItems)
    }
    if (nextNumber >= totalPages - 2) {
      paginationItems.push(<Pagination.Prev key="less" onClick={() => {handlePrev(nextNumber, totalPages, value)}}/>)
      for (let number = totalPages - 4; number <= totalPages; number++) {
        paginationItems.push(
          <Pagination.Item 
          key={number} 
          onClick={() => {handlePagination(number, totalPages, value)}}
          active={nextNumber === number}
          >
            {number}
          </Pagination.Item>
        )
      }
      setPagination(paginationItems)
    }
  }

  // >> arrow
  const handleLast = (number, totalPages, value) => {
    let nextNumber = number + 5
    if (nextNumber <= totalPages) {
      let results = []

      // HTTP GET request
      axios.get(url, {
        params: {
          query: value,
          pageSize: pageSizeLimit,
          pageNumber: nextNumber
        }
      }).then(res => {
        res.data.foods.forEach(item => results.push(item))
        setResult(results)
      })
      let paginationItems = []
      if (nextNumber < totalPages - 1) {
        paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(nextNumber, totalPages, value)}}/>)
        paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(nextNumber, totalPages, value)}}/>)
        paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, value)}}>{1}</Pagination.Item>)
        paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
        for (let i = nextNumber - 2; i <= nextNumber + 2; i++) {
          paginationItems.push(
            <Pagination.Item 
              key={i} 
              onClick={() => {handlePagination(i, totalPages, value)}}
              active={nextNumber === i}
            >
              {i}
            </Pagination.Item>
          )
        }
        paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
        paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, value)}}>{totalPages}</Pagination.Item>)
        paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(nextNumber, totalPages, value)}}/>)
        paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(nextNumber, totalPages, value)}}/>)
        setPagination(paginationItems)
      }
    }
  }

  // handles the results of each numbered page
  const handlePagination = (number, totalPages, value) => {
    let results = []

    // HTTP GET request
    axios.get(url, {
      params: {
        query: value,
        pageSize: pageSizeLimit,
        pageNumber: number
      }
    }).then(res => {
      res.data.foods.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    if (number < 4) {
      for (let i = 1; i <= 5; i++) {
        paginationItems.push(
          <Pagination.Item 
          key={i} 
          onClick={() => {handlePagination(i, totalPages, value)}}
          active={number === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Next key="more" onClick={() => {handleNext(number, totalPages, value)}}/>)
      setPagination(paginationItems)
    }
    if (number >= 4 && number < totalPages - 2) {
      paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(number, totalPages, value)}}/>)
      paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(number, totalPages, value)}}/>)
      paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, value)}}>{1}</Pagination.Item>)
      paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
      for (let i = number - 2; i <= number + 2; i++) {
        paginationItems.push(
          <Pagination.Item 
            key={i} 
            onClick={() => {handlePagination(i, totalPages, value)}}
            active={number === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
      paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, value)}}>{totalPages}</Pagination.Item>)
      paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(number, totalPages, value)}}/>)
      paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(number, totalPages, value)}}/>)
      setPagination(paginationItems)
    }
    if (number >= totalPages - 2) {
      paginationItems.push(<Pagination.Prev key="less" onClick={() => {handlePrev(number, totalPages, value)}}/>)
      for (let i = totalPages - 4; i <= totalPages; i++) {
        paginationItems.push(
          <Pagination.Item 
          key={i} 
          onClick={() => {handlePagination(i, totalPages, value)}}
          active={number === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      setPagination(paginationItems)
    }
  }

  return (
    <div className={searchStyles.body}>
      <h1 className={searchStyles.title}>Find a Grocery Item</h1>
      {/* Form component from react-bootstrap */}
      <Form>
        <Form.Group controlId="formBasicPassword">
          <Form.Control 
            type="text" 
            className={searchStyles.searchTerm}
            placeholder="Search your grocery item..."
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>
      <ul className={listStyles.list}>
        {result.map(item => {
          return (
            <li key={item.fdcId} className={listStyles.listItem}>
              <Link 
                href={{pathname: '/itemsearch/[fdcId]', query: {itemname: (item.brandOwner ? item.description + " - " + item.brandOwner : item.description)}}} 
                as={`/itemsearch/${item.fdcId}?itemname=${item.brandOwner ? item.description + " - " + item.brandOwner : item.description}`}
              >
                <a className={listStyles.itemLink}>
                  {item.description}
                  {item.brandOwner ? " - " + item.brandOwner : null}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
      {/* Pagination component from react-bootstrap */}
      <Pagination className={searchStyles.pagination}>{pagination}</Pagination>
    </div>
  )
}

export default ItemSearch