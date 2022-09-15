import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const CreditCardField = () => {
  return (
    <div>
      <label>クレジットカード/デビットカード</label>
      <fieldset>
        <div className="form-row">
          <div className="card-element">
            <PaymentElement />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default CreditCardField;
