import { log, BigInt } from "@graphprotocol/graph-ts";
import { getIpfsMetadataObject, parseIpfsHash } from "../../utils/ipfs";
import { convertToString } from "../../utils/json";
import { saveInnerSellerMetadata } from "./seller";
import { Seller } from "../../../generated/schema";

export function saveSellerMetadata(
  seller: Seller,
  // eslint-disable-next-line @typescript-eslint/ban-types
  timestamp: BigInt
): string | null {
  const ipfsHash = parseIpfsHash(seller.metadataUri);

  if (ipfsHash === null) {
    log.warning("Metadata URI does not contain supported CID: {}", [
      seller.metadataUri
    ]);
    return null;
  }
  const metadataObj = getIpfsMetadataObject(ipfsHash);

  if (metadataObj === null) {
    log.warning(
      "Could not load metadata for seller with id: {}, ipfsHash: {}",
      [seller.id.toString(), ipfsHash]
    );
    return null;
  }
  const metadataType = convertToString(metadataObj.get("type"));

  if (metadataType == "SELLER") {
    return saveInnerSellerMetadata(seller, metadataObj, timestamp);
  }

  return null;
}
