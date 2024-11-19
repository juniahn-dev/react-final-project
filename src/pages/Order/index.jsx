import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useInvoice } from "../../atom/invoice";
import { usePokes } from "../../atom/pokes";
import ExtraOrder from "../../components/ExtraOrder";
import extraData from "../../const/extra.json";
import "./index.css";

const Order = () => {
  const { id } = useParams();

  const { pokes } = usePokes();
  const { setInvoice } = useInvoice();

  const [amount, setAmount] = useState(1);
  const [order, setOrder] = useState([]);
  const [success, setSuccess] = useState(false);

  const poke = pokes?.find((poke) => poke.id === Number(id));

  const changeAmount = (target) => {
    if (target === "+") {
      setAmount((prev) => ++prev);
      return;
    }

    amount > 1 && setAmount((prev) => --prev);
  };

  const totalPrice = useMemo(() => {
    if (poke) {
      const pokePrice = poke.price * amount;
      let proteinAmount = 0;
      let additionsAmount = 0;
      let dressingAmount = 0;
      let toppingAmount = 0;

      if (order) {
        proteinAmount = order.protein
          ? order.protein.reduce((result, val) => result + val.price, 0)
          : 0;
        additionsAmount = order.additions
          ? order.additions?.reduce((result, val) => result + val.price, 0)
          : 0;
        dressingAmount = order.dressing
          ? order.dressing?.reduce((result, val) => result + val.price, 0)
          : 0;
        toppingAmount = order.topping
          ? order.topping?.reduce((result, val) => result + val.price, 0)
          : 0;
      }

      return (
        pokePrice +
        proteinAmount +
        additionsAmount +
        dressingAmount +
        toppingAmount
      );
    }
  }, [amount, order, poke]);

  const addInvoice = () => {
    setInvoice((prev) => {
      const updatedInvoice = { ...prev };
      //TODO: get UserId
      if (updatedInvoice[1]) {
        updatedInvoice[1] = [
          ...updatedInvoice[1],
          {
            poke: { ...poke, amount },
            additional: order,
            price: totalPrice,
          },
        ];
      } else {
        updatedInvoice[1] = [
          {
            poke: { ...poke, amount },
            additional: order,
            price: totalPrice,
          },
        ];
      }

      return updatedInvoice;
    });

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <div className="order-container">
      <div className="image-container">
        <img src={poke?.imageUrl} alt="poke-image" className="poke-image" />
      </div>
      {poke && (
        <div className="content-container">
          <div className="poke-information">
            <div className="title">{poke.title}</div>
            <div className="price">$ {poke.price}</div>
            <div>{poke.description}</div>
            <div className="allergies">
              Allergic:{" "}
              {poke.allergic.map((a, idx) => (
                <div key={idx} className="allergic">
                  {a}
                </div>
              ))}
            </div>
            <div className="amount">
              <div className="amount-count" onClick={() => changeAmount("-")}>
                -
              </div>
              <div className="count">{amount}</div>
              <div className="amount-count" onClick={() => changeAmount("+")}>
                +
              </div>
            </div>
          </div>
          <div className="order-container">
            <ExtraOrder title="protein" data={extraData} setOrder={setOrder} />
            <ExtraOrder
              title="additions"
              data={extraData}
              setOrder={setOrder}
            />
            <ExtraOrder title="dressing" data={extraData} setOrder={setOrder} />
            <ExtraOrder title="topping" data={extraData} setOrder={setOrder} />
          </div>
          {success ? (
            <div className="order-button">Success 🎉</div>
          ) : (
            <div className="order-button" onClick={addInvoice}>
              Add to order
              <div className="total-price">${totalPrice.toFixed(2)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
