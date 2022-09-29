
const axios=require('axios');
const SUBGRAPH_URL=' https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3 '
const { ethers }=require("ethers");
const infraURL="https://mainnet.infura.io/v3/2a074dc4b72449d99e8c66a60fa9bc75";
const provider=new ethers.providers.JsonRpcProvider(infraURL);

const { abi: INonfungiblePositionManager }=require('@Uniswap/v3-periphery/blob/v1.0.0/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json');
const POSITION_MANAGER_ADDRESS='0xC36442b4a4522E871399CD717aBDD847Ab11FE88';


TOKEN_ID_QUERY=` 
{
  positions(where: {
    owner: "0x11e4857bb9993a50c685a79afad4e6f65d518dda" , 
    pool: "0x6c6bc977e13df9b0de53b251522280bb72383700" , 


  }){
    id 
    owner
  }
}
`
async function main() {
  const result=await axios.post(SUBGRAPH_URL, { query: TOKEN_ID_QUERY })
  const positions=result.data.data.positions;
  console.log("positions", positions);


  const nonFungiblePositionManagerContract=new ethers.Contract(POSITION_MANAGER_ADDRESS, INonfungiblePositionManager.abi, provider);

  positions.map(p => {
    nonFungiblePositionManagerContract.positions(p.id).then(res => console.log(res));
  })
}






// Uniswap/v3-periphery/blob/v1.0.0/contracts/interfaces/INonfungiblePositionManager.sol









main() 
