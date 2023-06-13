/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { BigNumberish, Contract, ContractFactory, Overrides, Signer, utils } from "ethers";

import type { PromiseOrValue } from "../../common";
import type { Ed3AirlineGate, Ed3AirlineGateInterface } from "../../contracts/Ed3AirlineGate";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_ed3LoyaltyPointsAddress",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_ed3TicketNFTAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_pointsPerTicket",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "POINTS_PER_TICKET",
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
    name: "ed3LoyaltyPointsAddress",
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
    name: "ed3TicketNFTAddress",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b506040516109ab3803806109ab8339818101604052810190610032919061019a565b82600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080608081815250505050506101ed565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100f3826100c8565b9050919050565b610103816100e8565b811461010e57600080fd5b50565b600081519050610120816100fa565b92915050565b6000610131826100c8565b9050919050565b61014181610126565b811461014c57600080fd5b50565b60008151905061015e81610138565b92915050565b6000819050919050565b61017781610164565b811461018257600080fd5b50565b6000815190506101948161016e565b92915050565b6000806000606084860312156101b3576101b26100c3565b5b60006101c186828701610111565b93505060206101d28682870161014f565b92505060406101e386828701610185565b9150509250925092565b60805161079c61020f60003960008181610415015261048b015261079c6000f3fe60806040526004361061003f5760003560e01c80632def2615146100445780636a6278421461006f578063768b8b941461008b578063fd67c8ce146100b6575b600080fd5b34801561005057600080fd5b506100596100e1565b6040516100669190610512565b60405180910390f35b6100896004803603810190610084919061055e565b610107565b005b34801561009757600080fd5b506100a0610489565b6040516100ad91906105a4565b60405180910390f35b3480156100c257600080fd5b506100cb6104ad565b6040516100d891906105e0565b60405180910390f35b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636817c76c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610175573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101999190610627565b9050803410156101de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101d5906106b1565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5abeb016040518163ffffffff1660e01b8152600401602060405180830381865afa15801561024c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102709190610627565b905060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102e0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103049190610627565b9050808211610348576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033f9061071d565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636a62784234866040518363ffffffff1660e01b81526004016103a29190610512565b6000604051808303818588803b1580156103bb57600080fd5b505af11580156103cf573d6000803e3d6000fd5b5050505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f19857f00000000000000000000000000000000000000000000000000000000000000006040518363ffffffff1660e01b815260040161045192919061073d565b600060405180830381600087803b15801561046b57600080fd5b505af115801561047f573d6000803e3d6000fd5b5050505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006104fc826104d1565b9050919050565b61050c816104f1565b82525050565b60006020820190506105276000830184610503565b92915050565b600080fd5b61053b816104f1565b811461054657600080fd5b50565b60008135905061055881610532565b92915050565b6000602082840312156105745761057361052d565b5b600061058284828501610549565b91505092915050565b6000819050919050565b61059e8161058b565b82525050565b60006020820190506105b96000830184610595565b92915050565b60006105ca826104d1565b9050919050565b6105da816105bf565b82525050565b60006020820190506105f560008301846105d1565b92915050565b6106048161058b565b811461060f57600080fd5b50565b600081519050610621816105fb565b92915050565b60006020828403121561063d5761063c61052d565b5b600061064b84828501610612565b91505092915050565b600082825260208201905092915050565b7f496e73756666696369656e742066756e64730000000000000000000000000000600082015250565b600061069b601283610654565b91506106a682610665565b602082019050919050565b600060208201905081810360008301526106ca8161068e565b9050919050565b7f616972207469636b657420736f6c64206f757400000000000000000000000000600082015250565b6000610707601383610654565b9150610712826106d1565b602082019050919050565b60006020820190508181036000830152610736816106fa565b9050919050565b60006040820190506107526000830185610503565b61075f6020830184610595565b939250505056fea26469706673582212207d846aaf4943a8b28573757489b18b1bfe009b7b39d38941cdeb55b5f279018e64736f6c63430008110033";

type Ed3AirlineGateConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: Ed3AirlineGateConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class Ed3AirlineGate__factory extends ContractFactory {
  constructor(...args: Ed3AirlineGateConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _ed3LoyaltyPointsAddress: PromiseOrValue<string>,
    _ed3TicketNFTAddress: PromiseOrValue<string>,
    _pointsPerTicket: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<Ed3AirlineGate> {
    return super.deploy(
      _ed3LoyaltyPointsAddress,
      _ed3TicketNFTAddress,
      _pointsPerTicket,
      overrides || {},
    ) as Promise<Ed3AirlineGate>;
  }
  override getDeployTransaction(
    _ed3LoyaltyPointsAddress: PromiseOrValue<string>,
    _ed3TicketNFTAddress: PromiseOrValue<string>,
    _pointsPerTicket: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(
      _ed3LoyaltyPointsAddress,
      _ed3TicketNFTAddress,
      _pointsPerTicket,
      overrides || {},
    );
  }
  override attach(address: string): Ed3AirlineGate {
    return super.attach(address) as Ed3AirlineGate;
  }
  override connect(signer: Signer): Ed3AirlineGate__factory {
    return super.connect(signer) as Ed3AirlineGate__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Ed3AirlineGateInterface {
    return new utils.Interface(_abi) as Ed3AirlineGateInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Ed3AirlineGate {
    return new Contract(address, _abi, signerOrProvider) as Ed3AirlineGate;
  }
}
