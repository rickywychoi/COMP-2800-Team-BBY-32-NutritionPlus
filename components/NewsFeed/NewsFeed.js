import { useState, useEffect } from 'react'
import { Card, Form } from 'react-bootstrap'
import axios from 'axios'
import { NEWS_API_KEY } from '../../apiKey'
import feedStyles from '../../styles/NewsFeed.module.css'

const url = `https://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=${NEWS_API_KEY}`

const NewsFeed = (props) => {
  const [newsList, setNewsList] = useState([])
  const [tweets, setTweets] = useState(false)

  useEffect(() => {
    axios.get(url).then(res => {
      let results = []
      res.data.articles.forEach(item => {
        results.push(item)
      })
      setNewsList(results)
    })
  }, [])

  const handleToggleChange = e => {
    setTweets(prevState => !prevState)
  }

  return (
    <div>
      <div style={{display: "flex", justifyContent: "center"}}>
      <Form>
        <div style={{display: "flex"}}>
          <p style={{marginRight: "10px"}}>News Feed</p>
          <Form.Check 
            type="switch"
            id="custom-switch"
            label=""
            onChange = {handleToggleChange}
          />
          <p>Tweets</p>
        </div>
      </Form>
    </div>
    <div className={feedStyles.mainBody}>
      {newsList.map(item => {
        return(
          <a href={item.url} target="_blank" key={item.publishedAt} className={feedStyles.newsItem}>
            <Card className={feedStyles.card}>
              <Card.Img variant="top" src={item.urlToImage} className={feedStyles.newsImg}/>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>Source: {item.source.name}</Card.Text>
              </Card.Body>
            </Card>
          </a>
        )
      })}
      </div>
    </div>
  )
}

export default NewsFeed