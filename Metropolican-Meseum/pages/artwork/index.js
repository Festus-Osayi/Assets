import React from 'react'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'
import { Container, Row, Col, Pagination } from 'react-bootstrap'
import ArtworkCard from '../../components/ArtworkCard'
import { Card } from 'react-bootstrap'
import validObjectIDList from '@/public/data/validObjectIDList.json'

const PER_PAGE = 12
const index = () => {
  /**
   * todo: - get query params
   * useRouter hook to get the full value of the query string
   * "artworkList" (no default value) 
   * "page" (default value of 1)
   * Use SWR to make a request to the Metropolican API
   * with the query string, got from the request sent
   */
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  const [artworkList, setArtworkList] = useState()
  const [page, setPage] = useState(1)
  const fetcher = (url) => fetch(url).then(response => response.json())
  /** Use swr */
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher)

  /** decrease the value of page by 1 (page > 1) */
  function previousPage() {
    if (page > 1) {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  }
 
  /** increase the value of page by 1 (page < artworkList.length) */
  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  /**
   * todo: If data is not null / undefined, populate the result array
   * with a 2D array of data for paging that we can set in the state as "artworkList"
   * filter all objectID values in the validObjectIDList such that it only 
   * contains values that are also returned from our search.  
   * This has the effect of eliminating objectIDs from our search results that
   * are not in the validObjectIDList
   */
  

  useEffect(() => {
    const results = []
    if (data) {
      /** filter out every valid data object that is in validObjectIDList */
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results)
      setPage(1)
      
    }



  }, [data])


  // error handling here...
  if (error) {
    return <Error statusCode={404} />
  }
  /**check if the artworkList' state value is not null / undefined 
   * if it's defined then render the component
  */
  else if (artworkList) {
    return (
      <>

        {artworkList && artworkList.length > 0 ?
          <Container>
            <Row>
              {artworkList && artworkList[page - 1].map((data) => (

                <Col lg={3} key={data}><ArtworkCard objectID={data} /></Col>

              ))}
            </Row>
          </Container>
          :
          
          <>
          <br/>
          
            <Card className='mt-5 w-full'>
              <Card.Body>
                <Card.Text style={{fontWeight:'semi-bold', fontSize: "1.5rem", margin: 0 }}>
                  Nothing Here
                </Card.Text>
                <Card.Text style={{ fontSize: "1.2rem", margin: 0 }}>
                  Try searching for something else
                </Card.Text>
              </Card.Body>
            </Card>
          </>
          
        }


        {artworkList && artworkList.length > 0 && <Container>
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        </Container>}



      </>

    )


  }
  else {
    return null
  }







}

export default index