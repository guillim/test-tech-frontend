import { useState, useEffect} from 'react'

const useFetch = (url) => {

  const [data,setData] = useState(null)
  const [isPending, setIsPending] =  useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abor = new AbortController()
    fetch(url, {signal: abor.signal })
      .then( res => {
        if(!res.ok){
          throw Error('pb insinde server')
        }
        return res.json()
      })
      .then( res => {
        setData(res)
        setIsPending(false)
        setError(null)
      })
      .catch( e => {
        if (e.name === 'AbortError') {
          setIsPending(false)
        }else{
          setError(e.message)
          setIsPending(false)
        }
      })
      return () => abor.abort()
  },[url])

  return {
    data, isPending, error
  }
}

export default useFetch;
