import { reverse } from "ramda";
import { useTransaction } from "../../atom/transaction";
import "./index.css";

const Transactions = () => {
  const { transaction } = useTransaction();

  return (
    <div>
      <div className="title">Transactions</div>
      <div className="transaction-container">
        {transaction &&
          reverse(transaction)?.map((t, idx) => {
            const { status, invoice, date, arriveDate } = t;

            const totalPrice = invoice
              .reduce((result, i) => result + i.price, 0)
              .toFixed(2);
            const formatDate = new Date(date).toISOString().split("T")[0];
            const arriveFormatDate = new Date(arriveDate)
              .toISOString()
              .split("T")[0];
            const orderProdNames = () => {
              const firstProd = invoice[0];
              const { poke } = firstProd;

              if (invoice.length > 1) {
                return `${poke.title} and more ${invoice.length - 1}`;
              }

              return poke.title;
            };

            return (
              <div key={idx} className="transaction-card">
                <div className="ordered-card">
                  <div className="status">
                    {status === "ordered" ? `ETA ${arriveFormatDate}` : status}
                  </div>
                  <div className="order-info">
                    <div className="order-info-wrapper">
                      {orderProdNames()}{" "}
                      <div className="price">$ {totalPrice}</div>
                    </div>
                    <div>{formatDate}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Transactions;