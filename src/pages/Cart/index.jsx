import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationIcon from "../../assets/LocationIcon.svg";
import ScheduleIcon from "../../assets/ScheduleIcon.svg";
import { useInvoice } from "../../atom/invoice";
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

  const { invoice } = useInvoice();

  const totalPrice = useMemo(() => {
    return invoice.reduce((result, i) => result + i.price, 0);
  }, [invoice]);

  const pst = useMemo(() => {
    return Number(((totalPrice / 100) * 7).toFixed(2));
  }, [totalPrice]);
  const gst = useMemo(() => {
    return Number(((totalPrice / 100) * 5).toFixed(2));
  }, [totalPrice]);

  return (
    <div className="cart-container">
      <div className="title">Your Cart</div>
      <div className="content-wrapper">
        <div>
          <div className="order-item-count">
            YOUR ORDER ({invoice.length} ITEM)
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
                        <div>$ {price}</div>
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
              Location: 889 W Pender St #200, Vancouver, BC V6C 3B2
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
              <div>$ {totalPrice + pst + gst}</div>
            </div>
            <button className="pay-button">Continue to payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
