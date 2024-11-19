import { Link, useNavigate } from "react-router-dom";
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
  console.log(invoice);

  return (
    <div className="cart-container">
      <div className="title">Your Cart</div>
      <div className="content-wrapper">
        <div>
          <div className="order-item-count">
            YOUR ORDER ({invoice.length} ITEM)
          </div>
          {invoice ? (
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
              <div className="add-more-items-btn">
                <Link to="/">Add more items</Link>
              </div>
            </div>
          ) : (
            <div>Empty Cart</div>
          )}
        </div>
        <div>HOW TO GET IT</div>
      </div>
    </div>
  );
};

export default Cart;
