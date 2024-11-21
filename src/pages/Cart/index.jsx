import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationIcon from "../../assets/LocationIcon.svg";
import ScheduleIcon from "../../assets/ScheduleIcon.svg";
import { useInvoice } from "../../atom/invoice";
import { useTransaction } from "../../atom/transaction";
import { useUser } from "../../atom/user";
import { useUsers } from "../../atom/users";
import "./index.css";

const AdditionalRow = ({ additional }) => {
  return (
    <div className="additional-list">
      {additional.map((a, idx) => (
        <div key={`${idx}-${a.name}`} className="additional-info">
          <div className="additional-title">{a.name}</div>
          <div>$ {a.price}</div>
        </div>
      ))}
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const nowDate = new Date();

  const { user } = useUser();
  const { user: userInfo } = useUsers();
  const { invoice, setInvoice } = useInvoice();
  const { setTransaction } = useTransaction();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const totalPrice = useMemo(() => {
    return (
      Number(invoice?.reduce((result, i) => result + i.price, 0).toFixed(2)) ||
      0
    );
  }, [invoice]);

  const pst = useMemo(() => {
    return Number(((totalPrice / 100) * 7).toFixed(2)) || 0;
  }, [totalPrice]);
  const gst = useMemo(() => {
    return Number(((totalPrice / 100) * 5).toFixed(2)) || 0;
  }, [totalPrice]);

  const buy = () => {
    setTransaction((prev) => {
      const updateTransaction = { ...prev };
      const arriveDate = new Date();
      arriveDate.setDate(nowDate.getDate() + 1);

      if (updateTransaction[user]) {
        updateTransaction[user] = [
          ...updateTransaction[user],
          {
            invoice,
            status: "ordered",
            date: nowDate,
            arriveDate: arriveDate,
          },
        ];
      } else {
        updateTransaction[user] = [
          {
            invoice,
            status: "ordered",
            date: nowDate,
            arriveDate: arriveDate,
          },
        ];
      }

      return updateTransaction;
    });

    setInvoice((prev) => {
      const updateInvoice = { ...prev };

      updateInvoice[user] = [];

      return updateInvoice;
    });

    navigate("/transactions");
  };

  return (
    <div className="cart-container">
      <div className="title">Your Cart</div>
      <div className="content-wrapper">
        <div>
          <div className="order-item-count">
            YOUR ORDER ({invoice?.length} ITEM)
          </div>
          {invoice ? (
            <div className="invoice-wrapper">
              <div>
                {invoice.map((cart) => {
                  const { additional, poke, price } = cart;

                  return (
                    <div key={poke.id} className="poke-info-container">
                      <img
                        className="poke-image"
                        src={poke.imageUrl}
                        alt="poke-image"
                      />
                      <div className="poke-info">
                        <div className="info-list">
                          <div>{poke.title}</div>
                          <div>
                            $ {poke.price}
                            {poke.amount > 1 && ` x ${poke.amount}`}
                          </div>
                          {additional.topping && (
                            <AdditionalRow additional={additional.topping} />
                          )}
                          {additional.dressing && (
                            <AdditionalRow additional={additional.dressing} />
                          )}
                          {additional.protein && (
                            <AdditionalRow additional={additional.protein} />
                          )}
                          {additional.additions && (
                            <AdditionalRow additional={additional.additions} />
                          )}
                        </div>
                        <div>$ {price.toFixed(2)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="add-more-items-btn">
                <Link to="/">Add more items</Link>
              </div>
            </div>
          ) : (
            <div>Empty Cart</div>
          )}
        </div>
        <div>
          <div>HOW TO GET IT</div>
          <div className="pickup-info">
            <div>
              <img
                src={LocationIcon}
                alt="location-image"
                className="pickup-info-image"
              />
              Location: {userInfo.address}
            </div>
            <div>
              <img
                src={ScheduleIcon}
                alt="schedule-image"
                className="pickup-info-image"
              />
              Schedule: Tomorrow at 11:20 AM
            </div>
          </div>
          <div className="final-step">
            <div className="amount-step">
              <div>Subtotal</div>
              <div>$ {totalPrice}</div>
            </div>
            <div className="amount-step">
              <div>7% PST</div>
              <div>$ {pst}</div>
            </div>
            <div className="amount-step">
              <div>5% GST</div>
              <div>$ {gst}</div>
            </div>
            <div className="amount-step">
              <div>Estimated order total</div>
              <div>$ {(totalPrice + pst + gst).toFixed(2)}</div>
            </div>
            <button className="pay-button" onClick={buy}>
              Continue to payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
