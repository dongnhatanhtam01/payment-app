enum PaymentStatus {
    WaitingForPayment = 1,
    NeedConfirmSuccess = 7,
    Success = 2,
    Error = 3,
    WaitingForRefund = 4,
    RefundError = 5,
    Refunded = 6,
}

enum PaymentType {
    VnPay = 0,
    BankTranfer = 1,
    Cash = 2,
    VietmapPoint = 3,
    ZaloPay = 4,
    Other = 9,
}