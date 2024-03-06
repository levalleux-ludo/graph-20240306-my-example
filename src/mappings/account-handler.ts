/* eslint-disable @typescript-eslint/ban-types */
import { BigInt } from "@graphprotocol/graph-ts";
import {
  SellerCreated
} from "../../generated/BosonAccountHandler/IBosonAccountHandler";
import {
  Seller
} from "../../generated/schema";
import { getSellerMetadataEntityId } from "../entities/metadata/seller";
import { saveSellerMetadata } from "../entities/metadata/handler";

export function checkSellerExist(sellerId: BigInt): boolean {
  const seller = Seller.load(sellerId.toString());
  return !!seller;
}

export function handleSellerCreatedEvent(event: SellerCreated): void {
  const sellerFromEvent = event.params.seller;
  const sellerId = event.params.sellerId.toString();

  let seller = Seller.load(sellerId);

  if (!seller) {
    seller = new Seller(sellerId);
  }

  seller.metadataUri = sellerFromEvent.metadataUri || "N/A";
  seller.metadata = getSellerMetadataEntityId(seller.id.toString());
  seller.save();

  saveSellerMetadata(seller, event.block.timestamp);
}
