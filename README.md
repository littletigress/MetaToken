# MetaToken

Simple DApp to deposit and withdraw money from contract wallet. Built using truffle and react.

## Installation

First ensure you are in a new and empty directory.

1. Clone the repo with `git` command via console. 
   ```js
   git clone
   ```

2. Install Truffle globally to help compile and deploy contract. If you want to deploy contract locally, you can using Ganache for development. Download ganache from this link : https://www.trufflesuite.com/ganache or alternatively using ganache-cli.
    ```javascript
    npm install -g truffle
    
    //Install ganache-cli
    npm install -g ganache-cli
    ```

3. You can using either truffle development console or truffle command to compile and migrate the contract.
    ```javascript
    truffle develop
    
    //Using truffle command
    truffle compile
    truffle migrate
    ```

4. If you using truffle command, skip to step 5. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

5. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm run start
    ```

6. Truffle can run tests written in Solidity or JavaScript against your smart contracts (Not done yet~). Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```
    
7. To build the application for production, use the build script. A production build will be in the `client/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```
