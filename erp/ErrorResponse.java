package com.nuhcorre.erp.model.pluggy;

import java.util.List;
import lombok.Data;

@Data
public class ErrorResponse {

  String message;
  Integer code;
  List<ErrorDetail> details;
}
