var express = require('express')
var router = express.Router()
const { ethers } = require("ethers");
const Ape = require('../../contract/Ape.json');

router.use('/kyleapitest', async function (req, res) {
  const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");
  const contract = new ethers.Contract("0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", Ape.abi, provider);
  let apePrice = await contract.apePrice()
  return res.json({apePrice: apePrice.toString()})
})

module.exports = router
