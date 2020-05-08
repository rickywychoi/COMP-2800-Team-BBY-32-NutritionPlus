import axios from 'axios'
import { useState, setState } from 'react'
import Link from 'next/link'
import { Form, Button, Pagination } from 'react-bootstrap'
import menuQuestionnaireStyles from '../styles/menuQuestionnaire.module.css'
import { EDAMAM_RECIPE_APP_ID, EDAMAM_RECIPE_APP_KEY } from '../apiKey'

const MenuQuestionnaire = () => {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([]) 
    let value
    const [pagination, setPagination] = useState([])
    const [totalPages, setTotalPages] = useState()

    const url = `https://api.edamam.com/search?&app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}`
    const pageSizeLimit = 10    // from = 0 is default, and therefore unnecessary
    const searchLimit = 100

    // handles the user input from the search form
    const handleSearchInput = event => {
        // console.log('This happens when you change the text')
        // console.log(value)
        value = event.target.value
        setSearch(value)
    }

    // takes the user input from the search and submits as a query to the API, returning the results
    const handleSearchQuery = e => {
        // console.log(search);
        let results = []

        axios.get(url, {
          params: {
            q: search,
            to: pageSizeLimit - 1,
          }
        }).then(
          res => {
            // console.log(res.data)
            // console.log(res.data.hits)
            res.data.hits.forEach(item => results.push(item))
            setResult(results)
            let noPages = searchLimit / pageSizeLimit
            setTotalPages(noPages)
            if (noPages > 5) {  // if number of pages is > 5
                // console.log("over five")
                let paginationItems = []
                for (let number = 1; number <= 5; number++) {
                paginationItems.push(
                    <Pagination.Item 
                        key={number} 
                        onClick={() => {handlePagination(number, noPages, value)}}
                        active={1 === number}>
                        {number}
                    </Pagination.Item>
                )
              }
              paginationItems.push(<Pagination.Next key="next" onClick={() => {handleNext(1, noPages, value)}}/>)
              setPagination(paginationItems)
            } else {    // if number of pages is < 5
                // console.log("under five")
                let paginationItems = []
                for (let number = 1; number <= noPages; number++) {
                    paginationItems.push(
                    <Pagination.Item 
                      key={number} 
                      onClick={() => {handlePagination(number)}}
                      active={1 === number}>
                        {number}
                    </Pagination.Item>
                    )
                }
                setPagination(paginationItems)
            }
          }
        )
    }

    // << arrow
    const handleFirst = (number, totalPages, value) => {
        console.log("handleFirst")
        const prevNumber = number - 5
        if (prevNumber > 0) {
          let results = []
          axios.get(url, {
            params: {
              q: search,
              from: pageSizeLimit * (prevNumber - 1),
              to: (pageSizeLimit * prevNumber) - 1,
            }
          }).then(res => {
            res.data.hits.forEach(item => results.push(item))
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
                  active={prevNumber === i}>
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
        axios.get(url, {
          params: {
            q: search,
            from: pageSizeLimit * (prevNumber - 1),
            to: (pageSizeLimit * prevNumber) - 1,
          }
        }).then(res => {
            res.data.hits.forEach(item => results.push(item))
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
              active={prevNumber === i}>
                {i}
              </Pagination.Item>
            )
          }
          setPagination(paginationItems)
        }
        if (prevNumber > 3 && prevNumber <= totalPages - 3) {
          // console.log("sdfasdfasdf")
          paginationItems.push(<Pagination.First key="first" onClick={() => {handleFirst(prevNumber, totalPages, value)}}/>)
          paginationItems.push(<Pagination.Prev key="prev" onClick={() => {handlePrev(prevNumber, totalPages, value)}}/>)
          paginationItems.push(<Pagination.Item key="firstPage" onClick={() => {handleNumberOne(totalPages, value)}}>{1}</Pagination.Item>)
          paginationItems.push(<Pagination.Ellipsis key="ell1" disabled/>)
          for (let i = prevNumber - 2; i <= prevNumber + 2; i++) {
            paginationItems.push(
              <Pagination.Item 
                key={i} 
                onClick={() => {handlePagination(i, totalPages, value)}}
                active={prevNumber === i}>
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
                active={prevNumber === number}>
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
        axios.get(url, {
          params: {
            q: search,
            from: 0,
            to: pageSizeLimit - 1,
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
                onClick={() => {handlePagination(number, totalPages, value)}}
                active={1 === number}>
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
        axios.get(url, {
          params: {
            q: search,
            from: pageSizeLimit * (numberLast - 1),
            to: (pageSizeLimit * numberLast) - 1,
          }
        }).then(res => {
            res.data.hits.forEach(item => results.push(item))
            setResult(results)
        })
        let paginationItems = []
        paginationItems.push(<Pagination.Prev key="less" onClick={() => {handlePrev(numberLast, totalPages, value)}}/>)
        for (let number = totalPages - 4; number <= totalPages; number++) {
          paginationItems.push(
            <Pagination.Item 
                key={number} 
                onClick={() => {handlePagination(number, totalPages, value)}}
                active={numberLast === number}>
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
        axios.get(url, {
          params: {
            q: search,
            from: pageSizeLimit * number,
            to: (pageSizeLimit * nextNumber) - 1,
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
                onClick={() => {handlePagination(nextNumber, totalPages, value)}}
                active={nextNumber === number}>
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
                active={nextNumber === i}>
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
                active={nextNumber === number}>
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
          axios.get(url, {
            params: {
              q: search,
              from: pageSizeLimit * (nextNumber - 1),
              to: (pageSizeLimit * nextNumber) - 1,
            }
          }).then(res => {
            res.data.hits.forEach(item => results.push(item))
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
                  active={nextNumber === i}>
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
        const prevNum = number - 1;
        let results = []
        axios.get(url, {
          params: {
            q: search,
            from: pageSizeLimit * prevNum,
            to: (pageSizeLimit * number) - 1,
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
                onClick={() => {handlePagination(i, totalPages, value)}}
                active={number === i}>
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
                active={number === i}>
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
                active={number === i}>
                {i}
              </Pagination.Item>
            )
          }
          setPagination(paginationItems)
        }
      }

    return (
        <div className={menuQuestionnaireStyles.body}>
            <h1 className = {menuQuestionnaireStyles.title}>Enter a Recent Meal..</h1>
            <div className = {menuQuestionnaireStyles.searchContainer}>
                <Form>
                    <Form.Group controlId="formBasicPassword" className = {menuQuestionnaireStyles.search}>
                        <Form.Control 
                            type="text" 
                            placeholder="Search Menu..."
                            onChange = {handleSearchInput}
                        />
                    </Form.Group>
                </Form>
                <Button
                 className = {menuQuestionnaireStyles.button}
                 onClick = {handleSearchQuery}>
                    Search
                </Button>
            </div>

            <div className = {menuQuestionnaireStyles.second}>
                <ul className = {menuQuestionnaireStyles.results}>
                    {result.map(item => {
                        return (
                            <li key={item.recipe.uri} className={menuQuestionnaireStyles.recipes}>
                                <Link href = "/recipe/recipedetails" as = {`/recipe/${item.recipe.uri}`}>
                                    <a className = {menuQuestionnaireStyles.listItem}>
                                        {item.recipe.label}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Pagination className={menuQuestionnaireStyles.pagination}>{pagination}</Pagination>
        </div>
    )
}

export default MenuQuestionnaire;