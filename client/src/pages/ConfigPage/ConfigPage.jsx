import "./ConfigPage.scss";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import classNames from 'classnames';

const ConfigPage = () => {
    const optionsData = {
        "milkchocolate": {
            secondLayer: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
            ],
            decorativeLines: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
            ],
            decorativePoints: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
            ],
            confetti: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
                { label: "Multicolor", value: "Multicolor", color: "images/multicolor.png" },
            ],
        }, 

        "pinkchocolate": {
            secondLayer: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
            ],
            decorativeLines: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
            ],
            decorativePoints: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
            ],
            confetti: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
                { label: "Multicolor", value: "Multicolor", color: "images/multicolor.png" },
            ],
        },

        "darkchocolate": {
            secondLayer: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
            ],
            decorativeLines: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
            ],
            decorativePoints: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
            ],
            confetti: [
                { label: "White Chocolate", value: "White Chocolate", color: "#FAEBD7" },
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
                { label: "Multicolor", value: "Multicolor", color: "images/multicolor.png" },
            ],
        },
            
        "whitechocolate": {
            secondLayer: [
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
            ],
            decorativeLines: [
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
            ],
            decorativePoints: [
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
            ],
            confetti: [
                { label: "Milk Chocolate", value: "Milk Chocolate", color: "#A5563F" },
                { label: "Dark Chocolate", value: "Dark Chocolate", color: "#340E08" },
                { label: "Pink Chocolate", value: "Pink Chocolate", color: "#F2828C" },
                { label: "Multicolor", value: "Multicolor", color: "images/multicolor.png" },
            ],
        },
    };

    const configsList = {
        "milkchocolate": {
            title: "Milk Chocolate",
            description: `Indulge in the classic delight of our milk chocolate-covered
            strawberries. Each juicy strawberry is coated in creamy milk
            chocolate, offering a perfect balance of sweetness and rich
            cocoa flavor. This timeless combination is sure to satisfy
            your cravings.`,
            image: "images/milkchocolate.png",
        },

        "pinkchocolate": {
            title: "Pink Chocolate",
            description: `Enjoy the delightful experience of our pink chocolate-covered strawberries. 
            Each juicy strawberry is dipped in smooth white chocolate with a touch of pink coloring, 
            adding elegance to this sweet treat. Perfect for brightening any occasion with a blend of sweetness.`,
            image: "images/pinkchocolate.png",
        },

        "darkchocolate": {
            title: "Dark Chocolate",
            description: `Discover the intense flavor of our Dark Chocolate Covered Strawberries. 
            These succulent strawberries are coated in premium dark chocolate, offering a deep, robust taste 
            with just the right amount of bitterness. Perfect for a richer chocolate experience.`,
            image: "images/darkchocolate.png",
        },
            
        "whitechocolate": {
            title: "White Chocolate",
            description: `Enjoy the smooth and sweet sensation of our white chocolate-covered strawberries. 
            Each succulent strawberry is dipped in velvety white chocolate, creating a delicate and creamy treat. 
            Ideal for those who prefer a lighter, more subtle chocolate flavor.`,
            image: "images/whitechocolate.png",
        },
    }

    const choise = localStorage.getItem("base");
    const { updateCartCount } = useContext(CartContext); 
    
    const [count, setCount] = useState(1);
    const [price, setPrice] = useState(9.97);
    const [priceForOne, setPriceForOne] = useState(9.97);
    const [selectedOptions, setSelectedOptions] = useState({
        secondLayer: {active:0,selected:0,layer:null},
        decorativeLines: {active:0,selected:0,layer:null},
        decorativePoints: {active:0,selected:0,layer:null},
        confetti:  {active:0,selected:0,layer:null},
    });

    const handleClick = (category) => {
        setSelectedOptions((prevSelectedOptions) => {
            const currentCategory = prevSelectedOptions[category];
    
         return {
                ...prevSelectedOptions,
                [category]: {
                    ...currentCategory,
                    // Set the active state: if the current option is already active, reset it
                    active: currentCategory.active === 1 ? 0 : 1,
                    layer: currentCategory.selected === 1 ? null : null
                },
            };
        });
    } 
    
    const plus = () => {
        setCount((prevCount) => prevCount + 1);
    }

    const minus = () => {
        if (count > 1) {
            setCount(prevCount => prevCount-1);
        } 
    };
  
    useEffect(() => {
        const basePrice = 9.97; 
        let dopingPricePerUnit = 0;
    
        Object.values(selectedOptions).forEach((option) => {
            if (option.selected === 1) {
                dopingPricePerUnit += 0.5;
            }
        });

        const totalPrice = (basePrice + dopingPricePerUnit) * count;
        
        setPrice(Math.round(totalPrice * 100) / 100)
        setPriceForOne(Math.round((totalPrice / count) * 100) / 100);

    }, [count, selectedOptions]); 


    const handleSelection = (category, option) => {
        setSelectedOptions((prevSelectedOptions) => {
            const currentCategory = prevSelectedOptions[category];
            const isCurrentlySelected = currentCategory.layer === option; // Проверяем, выбран ли текущий элемент
    
            return {
                ...prevSelectedOptions,
                [category]: {
                    ...currentCategory,
                    selected: isCurrentlySelected ? 0 : 1, // Если элемент уже выбран, снимаем выбор
                    layer: isCurrentlySelected ? null : option,
                },
            };
        });
    };
    
    const handleSubmit = () => {
        let itemsList = JSON.parse(localStorage.getItem("cart"));
        if (!itemsList) {
            itemsList = {};
        }
        let isExists = null
        
        // checking if the order is alredy exists
        Object.keys(itemsList).forEach((key, value) => {
            if (
                configsList[choise].title === itemsList[key].Base && 
                selectedOptions.secondLayer.layer === itemsList[key].SecondLayer &&
                selectedOptions.decorativeLines.layer === itemsList[key].DecorativeLines &&
                selectedOptions.decorativePoints.layer ===  itemsList[key].DecorativePoints &&
                selectedOptions.confetti.layer === itemsList[key].Confetti
            ) {
                isExists = key
            }
        })

        if (isExists) {
            itemsList[isExists].Quantity += count
            itemsList[isExists].Price += price
        } else {
            let itemId = `item ${Math.round(Math.random()*10000)}`
            Object.keys(itemsList).map((key, value) => {
                while (itemId === key) {
                    itemId = `item ${Math.round(Math.random()*10000)}`
                }
                return itemId
            })

            const newItem = {
                Base: configsList[choise].title,  
                SecondLayer: selectedOptions.secondLayer.layer,
                DecorativeLines: selectedOptions.decorativeLines.layer,
                DecorativePoints: selectedOptions.decorativePoints.layer,
                Confetti: selectedOptions.confetti.layer,
                PriceForOne : priceForOne,
                Price: price,
                Quantity: count
            };
            
            itemsList[itemId] = newItem
        }

        localStorage.setItem("cart", JSON.stringify(itemsList));
        updateCartCount()
    }
    
    return (
        <main>
            <div className="container config-container">
                <div className="config-window">
                    <img src={configsList[choise].image} alt="sweetberry" />
                    <div className="produit-config">
                        <h3>{configsList[choise].title}</h3>
                        <p>{configsList[choise].description}</p>
                        <div className="main-underline"></div>
                        <div className="selections">
                            <div className="select select-second-layer">
                                <p>Second Layer</p>
                                <button type="button" 
                                    onClick={() => handleClick("secondLayer")} 
                                    className = {
                                        classNames({
                                            active: selectedOptions.secondLayer.active === 1,
                                            selected:selectedOptions.secondLayer.selected === 1,
                                        })}>
                                    <div className="dash dash1"></div>
                                    <div className="dash dash2"></div>
                                </button>

                                  <div className="list" style={{ display: selectedOptions.secondLayer.active === 1 ? "block" : "none" }}>
                                    <p className="list-title">Choose the color</p>
                                    {optionsData[choise].secondLayer.map((option, index) => {
                                        const isSelected = selectedOptions.secondLayer.layer === option.value;

                                        return (
                                            <div key={index} className={`option option${index + 1}`}>
                                                <div style={{ background: option.color }}></div>
                                                <p className="option-title">{option.label}</p>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => {
                                                            handleSelection("secondLayer", option.value);
                                                        }}
                                                        className="filled-in"
                                                    />
                                                    <span></span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="dopingPrice" style={{display:selectedOptions.secondLayer.selected === 1 && selectedOptions.secondLayer.layer != null ? "block" : "none" }}><p>0.5€</p></div>
                            </div>

                            <div className="select select-decoratives-lines">
                                <p>Decorative Lines</p>
                                <button type="button" 
                                    onClick={() => handleClick("decorativeLines")} 
                                    className = {
                                        classNames({
                                            active: selectedOptions.decorativeLines.active === 1,
                                            selected:selectedOptions.decorativeLines.selected === 1,
                                        })}>
                                    <div className="dash dash1"></div>
                                    <div className="dash dash2"></div>
                                </button>


                                <div className="list" style={{ display: selectedOptions.decorativeLines.active === 1 ? "block" : "none" }}>
                                    <p className="list-title">Choose the color</p>
                                    {optionsData[choise].decorativeLines.map((option, index) => {
                                        const isSelected = selectedOptions.decorativeLines.layer === option.value;

                                        return (
                                            <div key={index} className={`option option${index + 1}`}>
                                                <div style={{ background: option.color }}></div>
                                                <p className="option-title">{option.label}</p>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => {
                                                            handleSelection("decorativeLines", option.value);
                                                        }}
                                                        className="filled-in"
                                                    />
                                                    <span></span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="dopingPrice" style={{display:selectedOptions.decorativeLines.selected === 1 && selectedOptions.decorativeLines.layer != null ? "block" : "none" }}><p>0.5€</p></div>
                            </div>

                            <div className="select select-decoratives-points">
                                <p>Decorative Points</p>
                                <button type="button" 
                                    onClick={() => handleClick("decorativePoints")} 
                                    className = {
                                        classNames({
                                            active: selectedOptions.decorativePoints.active === 1,
                                            selected:selectedOptions.decorativePoints.selected === 1,
                                        })}>
                                    <div className="dash dash1"></div>
                                    <div className="dash dash2"></div>
                                </button>
                                <div className="list" style={{ display: selectedOptions.decorativePoints.active === 1 ? "block" : "none" }}>
                                    <p className="list-title">Choose the color</p>
                                    {optionsData[choise].decorativePoints.map((option, index) => {
                                        const isSelected = selectedOptions.decorativePoints.layer === option.value;

                                        return (
                                            <div key={index} className={`option option${index + 1}`}>
                                                <div style={{ background: option.color }}></div>
                                                <p className="option-title">{option.label}</p>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => {
                                                            handleSelection("decorativePoints", option.value);
                                                        }}
                                                        className="filled-in"
                                                    />
                                                    <span></span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="dopingPrice" style={{display:selectedOptions.decorativePoints.selected === 1 && selectedOptions.decorativePoints.layer != null ? "block" : "none" }}><p>0.5€</p></div>
                            </div>

                            <div className="select select-confetti">
                                <p>Confetti</p>
                     
                                 <button type="button" 
                                    onClick={() => handleClick("confetti")} 
                                    className = {
                                        classNames({
                                            active: selectedOptions.confetti.active === 1,
                                            selected:selectedOptions.confetti.selected === 1,
                                        })}>
                                    <div className="dash dash1"></div>
                                    <div className="dash dash2"></div>
                                </button>
                                <div className="list" style={{ display: selectedOptions.confetti.active === 1 ? "block" : "none" }}>
                                    <p className="list-title">Choose the color</p>
                                    {optionsData[choise].confetti.map((option, index) => {
                                        const isSelected = selectedOptions.confetti.layer === option.value;

                                        return (
                                            <div key={index} className={`option option${index + 1}`}>
                                                <div style={{ background: option.color }}></div>
                                                <p className="option-title">{option.label}</p>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => {
                                                            handleSelection("confetti", option.value);
                                                        }}
                                                        className="filled-in"
                                                    />
                                                    <span></span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="dopingPrice" style={{display:selectedOptions.confetti.selected === 1 && selectedOptions.confetti.layer != null ? "block" : "none" }}><p>0.5€</p></div>
                            </div>
                        </div>

                        <div className="submit">
                            <div className="quantity">
                                <button className="minus" 
                                    onClick={() => {
                                            minus()
                                        }
                                    }>
                                    <p>-</p>
                                </button>
                                <div className="count">
                                    <p>{count}</p>
                                </div>
                                <button className="plus" 
                                onClick={() => {
                                        plus()
                                    }
                                }>
                                    <p>+</p>
                                </button>

                            </div>
                            <p>{price}</p>
                            <input type="submit" onClick={handleSubmit} className="submit-button" value={"Add to cart"} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ConfigPage;