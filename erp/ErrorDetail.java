package com.nuhcorre.erp.model.pluggy;

import lombok.Data;

@Data
public class ErrorDetail {

  String code;
  String parameter;
  String message;
}
