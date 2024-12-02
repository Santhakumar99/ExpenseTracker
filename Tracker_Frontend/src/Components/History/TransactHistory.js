import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../Context/GlobalContext";
const TransactHistory = () => {
  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();
  // console.log(history)
  return (
    <HistoryStyled>
      <h2>Recent History</h2>
      {history.map((item) => {
        const { _id, Name, Amount, Type } = item;
        return (
          <div key={_id} className="history-item">
            <p
              style={{
                color: Type === "Expense" ? "red" : "green",
              }}
            >
              {Name}
            </p>

            <p
              style={{
                color: Type === "Expense" ? "red" : "green",
              }}
            >
              {Type === "Expense"
                ? `- ₹${Amount <= 0 ? 0 : Amount}`
                : `+ ₹${Amount <= 0 ? 0 : Amount}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
};

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export default TransactHistory;
