import Dictionaryhomepage from './Components/Dictionaryhomepage'
import './App.css'
import {QueryClient,QueryClientProvider} from 'react-query'

function App() {

const client=new QueryClient();
  return (
    <QueryClientProvider client={client}>
    <>
     <Dictionaryhomepage/>
    </>
    </QueryClientProvider>
  )
}

export default App
