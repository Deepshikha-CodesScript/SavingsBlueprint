import React from "react";

const CapitalReceipt = ({
  capitalReceipt,
  setCapitalReceipt,
  additionalCapitalReceipts,
  setAdditionalCapitalReceipts,
}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCapitalReceipt((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdditionalChange = (index, field, value) => {
    const updated = [...additionalCapitalReceipts];
    updated[index][field] = value;
    setAdditionalCapitalReceipts(updated);
  };

  const addField = () => {
    setAdditionalCapitalReceipts([
      ...additionalCapitalReceipts,
      {
        label: "",
        amount: "",
      },
    ]);
  };

  const removeField = (index) => {
    setAdditionalCapitalReceipts(
      additionalCapitalReceipts.filter((_, i) => i !== index)
    );
  };

  const totalCapitalReceipt =
    Number(capitalReceipt.saleOfHouseProperty || 0) +
    Number(capitalReceipt.saleOfLandPlot || 0) +
    Number(capitalReceipt.saleOfBusinessProperty || 0) +
    Number(capitalReceipt.lumpSumReceiptChitFund || 0) +
    Number(capitalReceipt.lumpSumReceiptDeposits || 0) +
    Number(capitalReceipt.saleOfSharesDebentures || 0);

  const additionalTotal = additionalCapitalReceipts.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <div className="personal-salary-container">

      <h3>Capital Receipt Details</h3>

      <div className="capital-receipt-grid">

  {/* LEFT CARD */}
  <div className="capital-card">

    <h4>Capital Receipt Sources</h4>

    <div className="capital-source-grid">

      <input
        type="number"
        name="saleOfHouseProperty"
        value={capitalReceipt.saleOfHouseProperty}
        onChange={handleChange}
        placeholder="Sale of House Property"
      />

      <input
        type="number"
        name="saleOfLandPlot"
        value={capitalReceipt.saleOfLandPlot}
        onChange={handleChange}
        placeholder="Sale of Land / Plot"
      />

      <input
        type="number"
        name="saleOfBusinessProperty"
        value={capitalReceipt.saleOfBusinessProperty}
        onChange={handleChange}
        placeholder="Sale of Business Property"
      />

      <input
        type="number"
        name="lumpSumReceiptChitFund"
        value={capitalReceipt.lumpSumReceiptChitFund}
        onChange={handleChange}
        placeholder="Lump Sum Receipt Chit Fund"
      />

      <input
        type="number"
        name="lumpSumReceiptDeposits"
        value={capitalReceipt.lumpSumReceiptDeposits}
        onChange={handleChange}
        placeholder="Lump Sum Receipt & Deposits"
      />

      <input
        type="number"
        name="saleOfSharesDebentures"
        value={capitalReceipt.saleOfSharesDebentures}
        onChange={handleChange}
        placeholder="Sale Of Shares & Debentures"
      />

    </div>

  </div>

  {/* RIGHT CARD */}
  <div className="capital-card">

    <h4>Additional Capital Receipts</h4>

    {additionalCapitalReceipts.map((item, index) => (
      <div key={index} className="dynamic-row-item">

        <input
          type="text"
          className="input-label"
          value={item.label}
          placeholder="Receipt Head"
          onChange={(e) =>
            handleAdditionalChange(
              index,
              "label",
              e.target.value
            )
          }
        />

        <input
          type="number"
          className="input-amount"
          value={item.amount}
          placeholder="₹ 0.00"
          onChange={(e) =>
            handleAdditionalChange(
              index,
              "amount",
              e.target.value
            )
          }
        />

        <button
          type="button"
          className="delete-row-btn"
          onClick={() => removeField(index)}
        >
          ✕
        </button>

      </div>
    ))}

    <button
      type="button"
      className="add-row-btn"
      onClick={addField}
    >
      + Add Capital Receipt
    </button>

  </div>

</div>

<div className="capital-total-summary">
  <div className="total-block">
    <span>Total Capital Receipt:</span>
    <strong>₹ {(totalCapitalReceipt + additionalTotal).toFixed(2)}</strong>
  </div>
</div>
    </div>
  );
};

export default CapitalReceipt;