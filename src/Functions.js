export const getFinalGrandTotalGlobal = (booking, grandTotal) =>{

    if (booking.bookingLoyalty && booking.bookingLoyalty.loyaltyValue) {
      if (booking.bookingPromoCode && booking.bookingPromoCode.discountPercent) {
        return Number(((grandTotal - ((grandTotal * booking.bookingPromoCode.discountPercent) / 100)) - (booking.bookingLoyalty.usedPoint * (1 / booking.bookingLoyalty.loyaltyValue))).toFixed(2));
      } else {
          if(Number(((grandTotal) - (booking.bookingLoyalty.usedPoint * (1 / booking.bookingLoyalty.loyaltyValue))).toFixed(2) < 0)){
              return Number(0)
          }else {
            return Number(((grandTotal) - (booking.bookingLoyalty.usedPoint * (1 / booking.bookingLoyalty.loyaltyValue))).toFixed(2));
          }
      }

    } else {
      if (booking.bookingPromoCode && booking.bookingPromoCode.discountPercent) {
        return Number((grandTotal - ((grandTotal * booking.bookingPromoCode.discountPercent) / 100)).toFixed(2));
      } else {
        return Number(grandTotal.toFixed(2));
      }
    }
}

export const getAppliedLoyaltyGlobal = (appliedLoyalty, grandTotal) => {
    if(appliedLoyalty > grandTotal) {
        return Number(grandTotal.toFixed(2))
    }else {
        return Number(appliedLoyalty.toFixed(2))
    }
}