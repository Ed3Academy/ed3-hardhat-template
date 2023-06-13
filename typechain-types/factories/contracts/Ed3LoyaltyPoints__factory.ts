/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { BigNumberish, Contract, ContractFactory, Overrides, Signer, utils } from "ethers";

import type { PromiseOrValue } from "../../common";
import type { Ed3LoyaltyPoints, Ed3LoyaltyPointsInterface } from "../../contracts/Ed3LoyaltyPoints";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "cap",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_mintTokenNumber",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523480156200001157600080fd5b506040516200248a3803806200248a833981810160405281019062000037919062000374565b80838381600390816200004b91906200064f565b5080600490816200005d91906200064f565b50505060008111620000a6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200009d9062000797565b60405180910390fd5b806080818152505050620000cf620000c3620000d860201b60201c565b620000e060201b60201c565b505050620007b9565b600033905090565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200020f82620001c4565b810181811067ffffffffffffffff82111715620002315762000230620001d5565b5b80604052505050565b600062000246620001a6565b905062000254828262000204565b919050565b600067ffffffffffffffff821115620002775762000276620001d5565b5b6200028282620001c4565b9050602081019050919050565b60005b83811015620002af57808201518184015260208101905062000292565b60008484015250505050565b6000620002d2620002cc8462000259565b6200023a565b905082815260208101848484011115620002f157620002f0620001bf565b5b620002fe8482856200028f565b509392505050565b600082601f8301126200031e576200031d620001ba565b5b815162000330848260208601620002bb565b91505092915050565b6000819050919050565b6200034e8162000339565b81146200035a57600080fd5b50565b6000815190506200036e8162000343565b92915050565b60008060006060848603121562000390576200038f620001b0565b5b600084015167ffffffffffffffff811115620003b157620003b0620001b5565b5b620003bf8682870162000306565b935050602084015167ffffffffffffffff811115620003e357620003e2620001b5565b5b620003f18682870162000306565b925050604062000404868287016200035d565b9150509250925092565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200046157607f821691505b60208210810362000477576200047662000419565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004e17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620004a2565b620004ed8683620004a2565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620005306200052a620005248462000339565b62000505565b62000339565b9050919050565b6000819050919050565b6200054c836200050f565b620005646200055b8262000537565b848454620004af565b825550505050565b600090565b6200057b6200056c565b6200058881848462000541565b505050565b5b81811015620005b057620005a460008262000571565b6001810190506200058e565b5050565b601f821115620005ff57620005c9816200047d565b620005d48462000492565b81016020851015620005e4578190505b620005fc620005f38562000492565b8301826200058d565b50505b505050565b600082821c905092915050565b6000620006246000198460080262000604565b1980831691505092915050565b60006200063f838362000611565b9150826002028217905092915050565b6200065a826200040e565b67ffffffffffffffff811115620006765762000675620001d5565b5b62000682825462000448565b6200068f828285620005b4565b600060209050601f831160018114620006c75760008415620006b2578287015190505b620006be858262000631565b8655506200072e565b601f198416620006d7866200047d565b60005b828110156200070157848901518255600182019150602085019450602081019050620006da565b868310156200072157848901516200071d601f89168262000611565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f45524332304361707065643a2063617020697320300000000000000000000000600082015250565b60006200077f60158362000736565b91506200078c8262000747565b602082019050919050565b60006020820190508181036000830152620007b28162000770565b9050919050565b608051611cb5620007d560003960006104940152611cb56000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c806370a08231116100a257806395d89b411161007157806395d89b41146102cf578063a457c2d7146102ed578063a9059cbb1461031d578063dd62ed3e1461034d578063f2fde38b1461037d57610116565b806370a082311461025b578063715018a61461028b57806379cc6790146102955780638da5cb5b146102b157610116565b8063313ce567116100e9578063313ce567146101b7578063355274ea146101d557806339509351146101f357806340c10f191461022357806342966c681461023f57610116565b806306fdde031461011b578063095ea7b31461013957806318160ddd1461016957806323b872dd14610187575b600080fd5b610123610399565b6040516101309190611241565b60405180910390f35b610153600480360381019061014e91906112fc565b61042b565b6040516101609190611357565b60405180910390f35b61017161044e565b60405161017e9190611381565b60405180910390f35b6101a1600480360381019061019c919061139c565b610458565b6040516101ae9190611357565b60405180910390f35b6101bf610487565b6040516101cc919061140b565b60405180910390f35b6101dd610490565b6040516101ea9190611381565b60405180910390f35b61020d600480360381019061020891906112fc565b6104b8565b60405161021a9190611357565b60405180910390f35b61023d600480360381019061023891906112fc565b6104ef565b005b61025960048036038101906102549190611426565b610505565b005b61027560048036038101906102709190611453565b610519565b6040516102829190611381565b60405180910390f35b610293610561565b005b6102af60048036038101906102aa91906112fc565b610575565b005b6102b9610595565b6040516102c6919061148f565b60405180910390f35b6102d76105bf565b6040516102e49190611241565b60405180910390f35b610307600480360381019061030291906112fc565b610651565b6040516103149190611357565b60405180910390f35b610337600480360381019061033291906112fc565b6106c8565b6040516103449190611357565b60405180910390f35b610367600480360381019061036291906114aa565b6106eb565b6040516103749190611381565b60405180910390f35b61039760048036038101906103929190611453565b610772565b005b6060600380546103a890611519565b80601f01602080910402602001604051908101604052809291908181526020018280546103d490611519565b80156104215780601f106103f657610100808354040283529160200191610421565b820191906000526020600020905b81548152906001019060200180831161040457829003601f168201915b5050505050905090565b6000806104366107f5565b90506104438185856107fd565b600191505092915050565b6000600254905090565b6000806104636107f5565b90506104708582856109c6565b61047b858585610a52565b60019150509392505050565b60006001905090565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000806104c36107f5565b90506104e48185856104d585896106eb565b6104df9190611579565b6107fd565b600191505092915050565b6104f7610cc8565b6105018282610d46565b5050565b6105166105106107f5565b82610d54565b50565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610569610cc8565b6105736000610f21565b565b610587826105816107f5565b836109c6565b6105918282610d54565b5050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546105ce90611519565b80601f01602080910402602001604051908101604052809291908181526020018280546105fa90611519565b80156106475780601f1061061c57610100808354040283529160200191610647565b820191906000526020600020905b81548152906001019060200180831161062a57829003601f168201915b5050505050905090565b60008061065c6107f5565b9050600061066a82866106eb565b9050838110156106af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106a69061161f565b60405180910390fd5b6106bc82868684036107fd565b60019250505092915050565b6000806106d36107f5565b90506106e0818585610a52565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b61077a610cc8565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036107e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e0906116b1565b60405180910390fd5b6107f281610f21565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361086c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086390611743565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d2906117d5565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109b99190611381565b60405180910390a3505050565b60006109d284846106eb565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610a4c5781811015610a3e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3590611841565b60405180910390fd5b610a4b84848484036107fd565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610ac1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ab8906118d3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b30576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b2790611965565b60405180910390fd5b610b3b838383610fe7565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610bc1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bb8906119f7565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610caf9190611381565b60405180910390a3610cc2848484610fec565b50505050565b610cd06107f5565b73ffffffffffffffffffffffffffffffffffffffff16610cee610595565b73ffffffffffffffffffffffffffffffffffffffff1614610d44576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3b90611a63565b60405180910390fd5b565b610d508282610ff1565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610dc3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dba90611af5565b60405180910390fd5b610dcf82600083610fe7565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610e55576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e4c90611b87565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610f089190611381565b60405180910390a3610f1c83600084610fec565b505050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b505050565b505050565b610ff9610490565b8161100261044e565b61100c9190611579565b111561104d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161104490611bf3565b60405180910390fd5b611057828261105b565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036110ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110c190611c5f565b60405180910390fd5b6110d660008383610fe7565b80600260008282546110e89190611579565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516111999190611381565b60405180910390a36111ad60008383610fec565b5050565b600081519050919050565b600082825260208201905092915050565b60005b838110156111eb5780820151818401526020810190506111d0565b60008484015250505050565b6000601f19601f8301169050919050565b6000611213826111b1565b61121d81856111bc565b935061122d8185602086016111cd565b611236816111f7565b840191505092915050565b6000602082019050818103600083015261125b8184611208565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061129382611268565b9050919050565b6112a381611288565b81146112ae57600080fd5b50565b6000813590506112c08161129a565b92915050565b6000819050919050565b6112d9816112c6565b81146112e457600080fd5b50565b6000813590506112f6816112d0565b92915050565b6000806040838503121561131357611312611263565b5b6000611321858286016112b1565b9250506020611332858286016112e7565b9150509250929050565b60008115159050919050565b6113518161133c565b82525050565b600060208201905061136c6000830184611348565b92915050565b61137b816112c6565b82525050565b60006020820190506113966000830184611372565b92915050565b6000806000606084860312156113b5576113b4611263565b5b60006113c3868287016112b1565b93505060206113d4868287016112b1565b92505060406113e5868287016112e7565b9150509250925092565b600060ff82169050919050565b611405816113ef565b82525050565b600060208201905061142060008301846113fc565b92915050565b60006020828403121561143c5761143b611263565b5b600061144a848285016112e7565b91505092915050565b60006020828403121561146957611468611263565b5b6000611477848285016112b1565b91505092915050565b61148981611288565b82525050565b60006020820190506114a46000830184611480565b92915050565b600080604083850312156114c1576114c0611263565b5b60006114cf858286016112b1565b92505060206114e0858286016112b1565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061153157607f821691505b602082108103611544576115436114ea565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611584826112c6565b915061158f836112c6565b92508282019050808211156115a7576115a661154a565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006116096025836111bc565b9150611614826115ad565b604082019050919050565b60006020820190508181036000830152611638816115fc565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061169b6026836111bc565b91506116a68261163f565b604082019050919050565b600060208201905081810360008301526116ca8161168e565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b600061172d6024836111bc565b9150611738826116d1565b604082019050919050565b6000602082019050818103600083015261175c81611720565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b60006117bf6022836111bc565b91506117ca82611763565b604082019050919050565b600060208201905081810360008301526117ee816117b2565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b600061182b601d836111bc565b9150611836826117f5565b602082019050919050565b6000602082019050818103600083015261185a8161181e565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006118bd6025836111bc565b91506118c882611861565b604082019050919050565b600060208201905081810360008301526118ec816118b0565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b600061194f6023836111bc565b915061195a826118f3565b604082019050919050565b6000602082019050818103600083015261197e81611942565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006119e16026836111bc565b91506119ec82611985565b604082019050919050565b60006020820190508181036000830152611a10816119d4565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611a4d6020836111bc565b9150611a5882611a17565b602082019050919050565b60006020820190508181036000830152611a7c81611a40565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000611adf6021836111bc565b9150611aea82611a83565b604082019050919050565b60006020820190508181036000830152611b0e81611ad2565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b6000611b716022836111bc565b9150611b7c82611b15565b604082019050919050565b60006020820190508181036000830152611ba081611b64565b9050919050565b7f45524332304361707065643a2063617020657863656564656400000000000000600082015250565b6000611bdd6019836111bc565b9150611be882611ba7565b602082019050919050565b60006020820190508181036000830152611c0c81611bd0565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000611c49601f836111bc565b9150611c5482611c13565b602082019050919050565b60006020820190508181036000830152611c7881611c3c565b905091905056fea2646970667358221220407feae4070183c1008478101515cc9bdf8b3cc6443d44807728e858cee21b4a64736f6c63430008110033";

type Ed3LoyaltyPointsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: Ed3LoyaltyPointsConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class Ed3LoyaltyPoints__factory extends ContractFactory {
  constructor(...args: Ed3LoyaltyPointsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    cap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<Ed3LoyaltyPoints> {
    return super.deploy(name, symbol, cap, overrides || {}) as Promise<Ed3LoyaltyPoints>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    cap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, cap, overrides || {});
  }
  override attach(address: string): Ed3LoyaltyPoints {
    return super.attach(address) as Ed3LoyaltyPoints;
  }
  override connect(signer: Signer): Ed3LoyaltyPoints__factory {
    return super.connect(signer) as Ed3LoyaltyPoints__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Ed3LoyaltyPointsInterface {
    return new utils.Interface(_abi) as Ed3LoyaltyPointsInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Ed3LoyaltyPoints {
    return new Contract(address, _abi, signerOrProvider) as Ed3LoyaltyPoints;
  }
}
