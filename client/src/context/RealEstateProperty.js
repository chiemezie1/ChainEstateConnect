import { useContractRead } from 'wagmi'
import RealEstateProperty from "../Contract/RealEstateProperty.json";




function App() {
  const { data, isError, isLoading } = useContractRead({
    address: RealEstateProperty.address,
    abi: RealEstateProperty.abi,
    functionName: 'getHighestRatedProduct',
  })
}

console.log(App)