import { useState } from "react";
import { useAllergyPreferences } from "../../atom/surveys";
import "./index.css";

const ExtraOrder = ({ title, data, setOrder }) => {
  const { allergies, isVegan } = useAllergyPreferences();
  console.log(allergies, isVegan);

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (isChecked, item) => {
    setCheckedItems((prev) =>
      isChecked ? [...prev, item] : prev.filter((i) => i.name !== item.name)
    );

    setOrder((prev) => {
      const updatedOrder = { ...prev };
      if (isChecked) {
        updatedOrder[title] = updatedOrder[title]
          ? [...updatedOrder[title], item]
          : [item];
      } else {
        updatedOrder[title] = updatedOrder[title].filter(
          (i) => i.name !== item.name
        );
        if (updatedOrder[title].length === 0) {
          delete updatedOrder[title];
        }
      }
      return updatedOrder;
    });
  };

  return (
    <div className="extra-container">
      <div className="title">{title}</div>
      <div className="ordering">
        {data[title].map((p, idx) => {
          const isChecked = checkedItems.some((item) => item.name === p.name);
          const isCombineAllergic = allergies?.filter((it) =>
            p.allergic.includes(it.toLowerCase())
          );

          return (
            <div
              key={`${title}-${idx}`}
              className={`${isCombineAllergic.length > 0 && "warning-allergic"
                } extra`}
            >
              <div className="checkbox-name">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isChecked}
                  onChange={(e) => handleCheckboxChange(e.target.checked, p)}
                  disabled={isCombineAllergic.length > 0}
                />
                <div>{p.name}</div>
              </div>
              <div>$ {p.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtraOrder;
