// RecipeSearch.js

import searchStyles from '../styles/ItemSearch.module.css'
import Link from 'next/link'
import { Form, Button, Pagination } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { EDAMAM_RECIPE_APP_ID, EDAMAM_RECIPE_APP_KEY } from '../apiKey'

const RecipeSearch = () => {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const [pagination, setPagination] = useState([])
  const [totalPages, setTotalPages] = useState()
  const url = `https://api.edamam.com/search?app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}`
  
  const pageSizeLimit = 10
  const searchLimit = 100

  const handleSearchInput = e => {
    let value = e.target.value
    setSearch(value)
  }


  const handleSearchQuery = e => {
    e.preventDefault()

    let results = []
    axios.get(url, {
      params: {
        q: search,
        to: pageSizeLimit - 1
      }
    }).then(res => {
      // console.log(res.data) // test
      res.data.hits.forEach(item => results.push(item))
      setResult(results)
      
      // original code: maxPage declaration is different
      // let maxPage = res.data.totalPages
      // if (res.data.totalPages * pageSizeLimit > searchLimit) {
      //   maxPage = Math.ceil(searchLimit / pageSizeLimit)
      // }
      // ~~ end (original code)
      let maxPage = searchLimit / pageSizeLimit // brian's code (line 42)
      setTotalPages(maxPage)
      if (maxPage > 5) {
        // console.log("over five")
        let paginationItems = []
        for (let number = 1; number <= 5; number++) {
          paginationItems.push(
            <Pagination.Item 
            key={number} 
            onClick={() => {handlePagination(number, maxPage, search)}}
            active={1 === number}
            >
              {number}
            </Pagination.Item>
          )
        }
        paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(1, maxPage, search)}}/>)
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

  const handleFirst = (number, totalPages, search) => {
    const prevNumber = number - 5
    if (prevNumber > 0) {
      let results = []
      axios.get(url, {
        params: {
          q: search,
          from: pageSizeLimit * number + 1,
          to: pageSizeLimit * (prevNumber + 1)
        }
      }).then(res => {
        res.data.hits.forEach(item => results.push(item))
        setResult(results)
      })
      let paginationItems = []
      if (prevNumber > 3) {
        paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(prevNumber, totalPages, search)}}/>)
        paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(prevNumber, totalPages, search)}}/>)
        paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, search)}}>{1}</Pagination.Item>)
        paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
        for (let i = prevNumber - 2; i <= prevNumber + 2; i++) {
          paginationItems.push(
            <Pagination.Item 
              key={i} 
              onClick={() => {handlePagination(i, totalPages, search)}}
              active={prevNumber === i}
            >
              {i}
            </Pagination.Item>
          )
        }
        paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
        paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, search)}}>{totalPages}</Pagination.Item>)
        paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(prevNumber, totalPages, search)}}/>)
        paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(prevNumber, totalPages, search)}}/>)
        setPagination(paginationItems)
      }
    }
  }

  const handlePrev = (number, totalPages, search) => {
    const prevNumber = number - 1
    let results = []
    axios.get(url, {
      params: {
        //option 1: brian's code right now (his: line 125)
        q: search,
        from: pageSizeLimit * (prevNumber - 1) + 1,
        to: pageSizeLimit * number

        //option 2: handleFirst (line 90)
        // q: search,
        // from: pageSizeLimit * number + 1,
        // to: pageSizeLimit * (prevNumber + 1)
      }
    }).then(res => {
      res.data.hits.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    if (prevNumber > totalPages - 3) {
      paginationItems.push(<Pagination.Prev key="less" onClick={() => {handlePrev(prevNumber, totalPages, search)}}/>)
      for (let i = totalPages - 4; i <= totalPages; i++) {
        paginationItems.push(
          <Pagination.Item 
          key={i} 
          onClick={() => {handlePagination(prevNumber, totalPages, search)}}
          active={prevNumber === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      setPagination(paginationItems)
    }
    if (prevNumber > 3 && prevNumber <= totalPages - 3) {
      //console.log("prevNumber > 3 && prevNumber <= " + (totalPages  - 3)) // test
      paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(prevNumber, totalPages, search)}}/>)
      paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(prevNumber, totalPages, search)}}/>)
      paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, search)}}>{1}</Pagination.Item>)
      paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
      for (let i = prevNumber - 2; i <= prevNumber + 2; i++) {
        paginationItems.push(
          <Pagination.Item 
            key={i} 
            onClick={() => {handlePagination(i, totalPages, search)}}
            active={prevNumber === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
      paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, search)}}>{totalPages}</Pagination.Item>)
      paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(prevNumber, totalPages, search)}}/>)
      paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(prevNumber, totalPages, search)}}/>)
      setPagination(paginationItems)
    }
    if (prevNumber <= 3) {
      for (let number = 1; number <= 5; number++) {
        paginationItems.push(
          <Pagination.Item 
          key={number} 
          onClick={() => {handlePagination(number, totalPages, search)}}
          active={prevNumber === number}
          >
            {number}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(prevNumber, totalPages, search)}}/>)
      setPagination(paginationItems)
    }
  }

  const handleNumberOne = (totalPages, search) => {
    let results = []
    const numberOne = 1
    axios.get(url, {
      params: {
        q: search,
        to: searchLimit
      }
    }).then(res => {
      res.data.hits.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    for (let number = 1; number <= 5; number++) {
      paginationItems.push(
        <Pagination.Item 
        key={number} 
        onClick={() => {handlePagination(number, totalPages, search)}}
        active={1 === number}
        >
          {number}
        </Pagination.Item>
      )
    }
    paginationItems.push(<Pagination.Next key="more" onClick={() => {handleNext(numberOne, totalPages, search)}}/>)
    setPagination(paginationItems)
  }

  const handleNumberLast = (totalPages, search) => {
    let results = []
    const numberLast = totalPages
    axios.get(url, {
      params: {
        q: search,
        to: searchLimit
      }
    }).then(res => {
      res.data.hits.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    paginationItems.push(<Pagination.Prev key="less" onClick={() => {handlePrev(numberLast, totalPages, search)}}/>)
    for (let number = totalPages - 4; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item 
        key={number} 
        onClick={() => {handlePagination(number, totalPages, search)}}
        active={numberLast === number}
        >
          {number}
        </Pagination.Item>
      )
    }
    setPagination(paginationItems)
  }

  const handleNext = (number, totalPages, search) => {
    let nextNumber = number + 1
    let results = []
    axios.get(url, {
      params: {
        q: search,
        to: searchLimit
      }
    }).then(res => {
      res.data.hits.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    if (nextNumber < 4) {
      for (let number = 1; number <= 5; number++) {
        paginationItems.push(
          <Pagination.Item 
          key={number} 
          onClick={() => {handlePagination(nextNumber, totalPages, search)}}
          active={nextNumber === number}
          >
            {number}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Next key="more" onClick={() => {handleNext(nextNumber, totalPages, search)}}/>)
      setPagination(paginationItems)
    }
    if (nextNumber >= 4 && nextNumber < totalPages - 2) {
      paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(nextNumber, totalPages, search)}}/>)
      paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(nextNumber, totalPages, search)}}/>)
      paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, search)}}>{1}</Pagination.Item>)
      paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
      for (let i = nextNumber - 2; i <= nextNumber + 2; i++) {
        paginationItems.push(
          <Pagination.Item 
            key={i} 
            onClick={() => {handlePagination(i, totalPages, search)}}
            active={nextNumber === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
      paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, search)}}>{totalPages}</Pagination.Item>)
      paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(nextNumber, totalPages, search)}}/>)
      paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(nextNumber, totalPages, search)}}/>)
      setPagination(paginationItems)
    }
    if (nextNumber >= totalPages - 2) {
      paginationItems.push(<Pagination.Prev key="less" onClick={() => {handlePrev(nextNumber, totalPages, search)}}/>)
      for (let number = totalPages - 4; number <= totalPages; number++) {
        paginationItems.push(
          <Pagination.Item 
          key={number} 
          onClick={() => {handlePagination(number, totalPages, search)}}
          active={nextNumber === number}
          >
            {number}
          </Pagination.Item>
        )
      }
      setPagination(paginationItems)
    }
  }

  const handleLast = (number, totalPages, search) => {
    let nextNumber = number + 5
    if (nextNumber <= totalPages) {
      let results = []
      axios.get(url, {
        params: {
          q: search,
          to: searchLimit
        }
      }).then(res => {
        res.data.hits.forEach(item => results.push(item))
        setResult(results)
      })
      let paginationItems = []
      if (nextNumber < totalPages - 1) {
        paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(nextNumber, totalPages, search)}}/>)
        paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(nextNumber, totalPages, search)}}/>)
        paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, search)}}>{1}</Pagination.Item>)
        paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
        for (let i = nextNumber - 2; i <= nextNumber + 2; i++) {
          paginationItems.push(
            <Pagination.Item 
              key={i} 
              onClick={() => {handlePagination(i, totalPages, search)}}
              active={nextNumber === i}
            >
              {i}
            </Pagination.Item>
          )
        }
        paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
        paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, search)}}>{totalPages}</Pagination.Item>)
        paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(nextNumber, totalPages, search)}}/>)
        paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(nextNumber, totalPages, search)}}/>)
        setPagination(paginationItems)
      }
    }
  }

  const handlePagination = (number, totalPages, search) => {
    let results = []
    axios.get(url, {
      params: {
        q: search,
        from: pageSizeLimit * (number - 1),
        to: pageSizeLimit * number - 1
      }
    }).then(res => {
      res.data.hits.forEach(item => results.push(item))
      setResult(results)
    })
    let paginationItems = []
    if (number < 4) {
      for (let i = 1; i <= 5; i++) {
        paginationItems.push(
          <Pagination.Item 
          key={i} 
          onClick={() => {handlePagination(i, totalPages, search)}}
          active={number === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Next key="more" onClick={() => {handleNext(number, totalPages, search)}}/>)
      setPagination(paginationItems)
    }
    if (number >= 4 && number < totalPages - 2) {
      paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(number, totalPages, search)}}/>)
      paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(number, totalPages, search)}}/>)
      paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, search)}}>{1}</Pagination.Item>)
      paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
      for (let i = number - 2; i <= number + 2; i++) {
        paginationItems.push(
          <Pagination.Item 
            key={i} 
            onClick={() => {handlePagination(i, totalPages, search)}}
            active={number === i}
          >
            {i}
          </Pagination.Item>
        )
      }
      paginationItems.push(<Pagination.Ellipsis key="ell2" disabled/>)
      paginationItems.push(<Pagination.Item key="lastPage" onClick={() => {handleNumberLast(totalPages, search)}}>{totalPages}</Pagination.Item>)
      paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(number, totalPages, search)}}/>)
      paginationItems.push(<Pagination.Last key="last" onClick={() => {handleLast(number, totalPages, search)}}/>)
      setPagination(paginationItems)
    }
    if (number >= totalPages - 2) {
      paginationItems.push(<Pagination.Prev key="less" onClick={() => {handlePrev(number, totalPages, search)}}/>)
      for (let i = totalPages - 4; i <= totalPages; i++) {
        paginationItems.push(
          <Pagination.Item 
          key={i} 
          onClick={() => {handlePagination(i, totalPages, search)}}
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
      <Form>
        <Form.Group 
          controlId="formBasicPassword"
          className={searchStyles.search}>
          <Form.Control 
            type="text" 
            placeholder="Search Recipes..."
            onChange={handleSearchInput}
          />
        </Form.Group>
      </Form>
      <Button
        className={searchStyles.button}
        onClick={handleSearchQuery}>
          Search
      </Button>

      <ul className={searchStyles.list}>
        {result.map(item => {
          return (
            <li key={item.recipe.uri} className={searchStyles.listItem}>
              <Link href="/recipe/[recipeId]?search=" as={`/recipe/${getURI(item.recipe.uri)}?search=${search}`}>
                <a className={searchStyles.itemLink}>
                  {item.recipe.label}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
      <Pagination className={searchStyles.pagination}>{pagination}</Pagination>
    </div>
  )
}

function getURI(item) {
  const searchTerm = "recipe_";
  const lengthSearch = searchTerm.length;

  let index = item.indexOf(searchTerm) + lengthSearch;

  let uri = item.substr(index);
  return uri;
}


export default RecipeSearch 