import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>התחברות</div>
      <div className={props.step2 ? 'active' : ''}>כתובת משלוח</div>
      <div className={props.step3 ? 'active' : ''}>שיטת תשלום</div>
      <div className={props.step4 ? 'active' : ''}>אישור הזמנה</div>
    </div>
  );
}