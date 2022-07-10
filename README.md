# NextJS - Starknet.js - Cairo • Workshop

**StarknetCC** - Full dApp workshop by Alpha Road team


## Introduction

This workshop will show you how to dev a full Starknet dApp with NextJS & [Starknet.js](https://github.com/seanjameshan/starknet.js), including multi-wallets support([Argent-x](https://github.com/argentlabs/argent-x) | [Braavos](https://braavos.app/)) and multi-call transactions.

This repo contains the front-end part, you'll find the contracts part [here](https://github.com/419Labs/access-controller-contracts)

## Prerequisite

To follow this workshop you should at least:
- Have basic knowledge in ReactJS / NextJS framework
- Have basic knowledge in Cairo smart contracts development 
- Have basic knowledge on how Starknet works(BC in general, Account abstraction, ...)

About the tooling:
- IDE
- Yarn or NPM
- [Nile](https://github.com/OpenZeppelin/nile) (smart contracts part)

Clone the repository

```bash
git clone git@github.com:419Labs/workshop-arf-dapp.git
cd workshop-arf-dapp
```

Install Dependencies

```bash
yarn | npm install 
```

## TODO

1) Familiarize a little with the project
   1) Use of [React Context](https://fr.reactjs.org/docs/hooks-reference.html#usecontext) to isolate code complexity
      1) **/src/context**
   2) Components that use our wallet connection under **/src/components/wallet**
   3) Contracts constants & ABI's under **/src/contracts**
   4) (use of [ChakraUI](https://chakra-ui.com/getting-started) components library)

## Docs

Here is all the docs you'll need to complete the workshop

https://www.starknetjs.com/

https://github.com/starknet-community-libs/get-starknet

https://github.com/OpenZeppelin/nile

## Helps

Work with **big numbers** in JavaScript could be a mess.
As you'll probably use the 18 decimals standard for the token balances, you'll not be able to store it as a Number but as a string representation.
To abstract the complexity, you can use the well known [Ether.js library](https://docs.ethers.io/v5/getting-started/) (especially the formatUnits & parseUnits)
in completion of the [Starknet.js](https://github.com/seanjameshan/starknet.js) helpers(toFelt, bnToUint256, ...)


## Thanks

Forked from [Cairopal](https://github.com/abigger87/cairopal)

## License

This workshop is released under the [AGPL-3.0-only](LICENSE).