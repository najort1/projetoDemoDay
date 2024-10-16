package com.nuhcorre.erp.model.pluggy;

import lombok.Data;

@Data
public class Expenses {
  String id;
  String transactionId;
  Double serviceTax;
  Double brokerageFee;
  Double incomeTax;
  Double other;
  Double tradingAssetsNoticeFee;
  Double maintenanceFee;
  Double settlementFee;
  Double clearingFee;
  Double stockExchangeFee;
  Double custodyFee;
  Double operatingFee;
}
