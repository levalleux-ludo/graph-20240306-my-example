This subgraph highlights an issue raised on The Graph Hosted Service in the last 4 weeks (between 5th of Feb and 5th of March 2024)

The Boson Protocol subgraph (testing env / Mumbai - https://thegraph.com/hosted-service/subgraph/bosonprotocol/mumbai-testing) was deployed on Hosted Service without any issue until 5th of Feb 2024.
On the 5th of March 2024, any new attempts to deploy this subgraph (even an identical version to the one previously deployed in Feb) raise the following issue:
![image](https://github.com/levalleux-ludo/graph-20240306-my-example/assets/7184124/735462e6-70ec-429a-a93f-ffda98dfa93d)
Message: `Handler skipped due to execution failure, transaction: 0x4fa7…eb77, address: 0x7605…2630, signature: SellerCreated(indexed uint256,(uint256,address,address,address,address,bool,string),address,(uint256,uint8),indexed address), error: transaction 4fa7a3457057b2d1f2952a27c4384d74d6c4e3b314f23937fdf9fc0718bfeb77: error while executing at wasm backtrace: 0: 0x3f6b - <unknown>!src/utils/ipfs/getIpfsMetadataObject 1: 0x752d - <unknown>!src/entities/metadata/handler/saveSellerMetadata 2: 0x78a9 - <unknown>!src/mappings/account-handler/handleSellerCreatedEvent: `ipfs.cat` is deprecated. Improved support for IPFS will be added in the future, handler: handleSellerCreatedEvent`

https://thegraph.com/hosted-service/subgraph/bosonprotocol/mumbai-testing?version=pending&selected=logs

In order to make analysis easier, an upgrade to the latest version of graph-ts/graph-cli has been realised.
However, we still observe the same issue.

The current repository is a very light example to reproduce the problem and allow it being analysed.
The subgraph has been deployed to https://thegraph.com/hosted-service/subgraph/levalleux-ludo/bosontesting?version=pending&selected=logs where we can observe the same error in the logs.

