import React, { useState } from 'react'
import { 
  Box, 
  Text, 
  Button, 
  Image, 
  Flex, 
  Heading, 
  FormControl, 
  Input,
  List,
  ListItem
} from "@chakra-ui/react";
import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'



function App () {

  return (
    <ChakraProvider>
      <Header />
      <Main/>
  </ChakraProvider>
  )
  
};

const Main = () => {
   const [search, setSearch] = useState<string>('')
   const [results, setResults] = useState<any>({})

     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => 
      setSearch(e.target.value)


  const searchSrt = async () => {
    if (!search) {
      alert('please enter something')
      return
    }
    const api_key:any = process.env.REACT_APP_OPEN_SUBSTITLE_KEY

     try{ 
      const { data: { data } }  = await axios.get(`/api/v1/subtitles?query=${search}`, {
        headers: {
          'Api-Key': `${api_key}`,
          'Content-Type': 'application/json'
        }
      })

      setResults(data[0]) 
      }catch(err: any) {
        console.log(err.message)
      }
  }

  const { attributes } = results

  return (
    <Box maxW="1400px" m="40px auto">
      <Flex mb="20px">
        <FormControl>
          <Input placeholder="Type your movie here" color="white" value={search} onChange={onChange} size="md" type="text" />
        </FormControl>
        <Button onClick={searchSrt} size="md" backgroundImage="linear-gradient(90deg, #3F00FF, #8D57FF 60%)" color="white">Search</Button>
      </Flex>
      <Flex>
        <Box style={{borderTopLeftRadius: 15, borderBottomLeftRadius: 15}} w="400px" h="60vh" bg="#292929">Results
          <Flex>
          </Flex> 
        </Box>
        <Box w="100%" h="60vh" bg="#000" style={{borderTopRightRadius: 15, borderBottomRightRadius: 15}}>
          <Flex flexDir="column">
            <Box w="100%" p="30">
             
              {Object.keys(results).length > 0 && (
                 <Flex gap={10}>
               <Image style={{objectFit: 'contain'}} height="500px" src={attributes?.related_links?.img_url} alt='Dan Abramov' />
               <Box>
                  <Heading mb="10" as='h3' size='lg' color="white">{attributes?.feature_details?.title}</Heading>
                  <List>
                    <ListItem color="white">Feature Type: {attributes?.feature_details?.feature_type}</ListItem>
                    <ListItem color="white">New Downloads: {attributes?.new_download_count}</ListItem>
                    <ListItem color="white">New Downloads: {attributes?.upload_date}</ListItem>
                  </List>
                </Box>
               </Flex>   
              )}
            </Box>
          
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}


const Header = () => {
  return (
    <Box height="100%" p="5" bg="#000">
      <Box maxW="6xl" mx="auto">
        <Flex
          as="nav"
          aria-label="Site navigation"
          align="center"
          justify="space-between"
        >
            <Heading mr="4" size="md" as="button" color="white">
              Substitle Inserter
            </Heading>
            <Text fontSize='md' color="white">Creator:Fred</Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default App;
