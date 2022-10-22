import React, { useEffect, useState } from 'react'
import axios from 'axios'


function App () {
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    async function searchSubtitle(): Promise<any>  {
      try{ 
      const { data }  = await axios.get('https://api.opensubtitles.com/api/v1/subtitles?query=The Lost City')
      console.log(data)
      }catch(err) {
        console.log(err)
      }
    }

    searchSubtitle()
  }, [])

  return (
    <div>Hello Application</div>
  )
  
};

export default App;
