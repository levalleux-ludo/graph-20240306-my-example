import { JSONValue, TypedMap, BigInt } from "@graphprotocol/graph-ts";
import { Seller, SellerMetadata } from "../../../../generated/schema";
import { convertToString } from "../../../utils/json";

export function getSellerMetadataEntityId(id: string): string {
  return `${id}-seller-metadata`;
}

export function saveInnerSellerMetadata(
  seller: Seller,
  metadataObj: TypedMap<string, JSONValue>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  timestamp: BigInt
): string {
  const sellerId = seller.id.toString();
  const metadataId = getSellerMetadataEntityId(sellerId);

  const name = convertToString(metadataObj.get("name"));
  let sellerMetadata = SellerMetadata.load(metadataId);

  if (!sellerMetadata) {
    sellerMetadata = new SellerMetadata(metadataId);
  }
  sellerMetadata.name = name;
  sellerMetadata.save();
  return metadataId;
}
