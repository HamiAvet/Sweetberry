import "./MainPage.scss"
import { useState, useEffect } from "react"
import { Link } from "react-scroll"

const MainPage = () => {
    const [base, setBase] = useState(() => localStorage.getItem("base"))

    useEffect(()=> {
        localStorage.setItem("base", base)
    }, [base])
    
    const choice = (name) => {
        setBase(name)
        
    }

    return (
        <main>
            <div className="top">
                <div className="intro">
                    <img src="/sweetberry.ico" alt="logo" />
                    <h2>Sweetberry</h2>
                    <p>
                        Rediscover the strawberry with our chocolate strawberries. 
                        Sweeter and more delicious, perfect for decorating your table 
                        with our sweet strawberries and impressing your guests while delighting them.
                    </p>
                    <div className="main-underline"></div>
                </div>
                    <Link className="scroll-button" to="products" smooth={true} duration={500}>
                        <button className="inner-circle">
                            <img src="images/Vectorarrowdown.png" alt="down" />
                        </button>
                        <button className="outer-circle"></button>
                    </Link>
                    
            </div>
            
            <div className="main-content">

                <div className="products part">
                    <h3 className="title">Products</h3>
                    <div className="cards">
                        <div className="card">
                            <img src="images/milkchocolate.png" alt="strawberry" />
                            <div className="info-part">
                                <h5>Milk Chocolate</h5>
                                <div className="small-underline"></div>
                                <p>
                                    Indulge in the classic delight of our milk chocolate-covered strawberries. 
                                    Each juicy strawberry is coated in creamy milk chocolate, 
                                    offering a perfect balance of sweetness and rich cocoa flavor. 
                                    This timeless combination is sure to satisfy your cravings.
                                </p>
                                <a href="/configuration" onClick={() => choice("milkchocolate")}>see</a>
                            </div>
                        </div>

                        <div className="card">
                            <img src="images/pinkchocolate.png" alt="strawberry" />
                            <div className="info-part">
                                <h5>Pink Chocolate</h5>
                                <div className="small-underline"></div>
                                <p>
                                Enjoy the delightful experience of our pink chocolate-covered strawberries. 
                                Each juicy strawberry is dipped in smooth white chocolate with a touch of pink coloring, 
                                adding elegance to this sweet treat. Perfect for brightening any occasion with a blend of sweetness.
                                </p>
                                <a href="/configuration" onClick={() => choice("pinkchocolate")}>see</a>
                            </div>
                        </div>

                        <div className="card">
                            <img src="images/darkchocolate.png" alt="strawberry" />
                            <div className="info-part">
                                <h5>Dark Chocolate</h5>
                                <div className="small-underline"></div>
                                <p>
                                Discover the intense flavor of our Dark Chocolate Covered Strawberries. 
                                These succulent strawberries are coated in premium dark chocolate, 
                                offering a deep, robust taste with just the right amount of bitterness. 
                                Perfect for a richer chocolate experience.
                                </p>
                                <a href="/configuration" onClick={() => choice("darkchocolate")}>see</a>
                            </div>
                        </div>

                        <div className="card">
                            <img src="images/whitechocolate.png" alt="strawberry" />
                            <div className="info-part">
                                <h5>White Chocolate</h5>
                                <div className="small-underline"></div>
                                <p>
                                Enjoy the smooth and sweet sensation of our white chocolate-covered strawberries. 
                                Each succulent strawberry is dipped in velvety white chocolate, 
                                creating a delicate and creamy treat. Ideal for those who prefer a lighter, 
                                more subtle chocolate flavor.
                                </p>
                                <a href="/configuration" onClick={() => choice("whitechocolate")}>see</a>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="big-underline"></div>

                <div className="about part">
                    <h3 className="title">About</h3>
                    <p>
                    Welcome to SweetBerry, your gourmet destination for exquisite chocolate-covered strawberries. 
                    At SweetBerry, we believe that every bite should be a pure pleasure experience. 
                    Our strawberries, carefully selected for their freshness and exceptional flavor, 
                    are coated with premium quality chocolate, creating a perfect harmony between sweet and fruity. 
                    In addition to being a treat for your taste buds, our chocolate-covered strawberries 
                    also make a beautiful table decoration, adding an elegant and delicious touch to your events. 
                    Whether for a special gift, a celebration, or simply to indulge yourself, our chocolate-covered 
                    strawberries are the ideal delicacy. Discover the elegance and sweetness of SweetBerry, 
                    where every strawberry is a true gourmet masterpiece.
                    </p>
                </div>

                <div className="big-underline"></div>

                <div className="contact part">
                    <h3 className="title">Contact</h3>
                    <p className="text">For more information or for professional proposals, please contact us.</p>
                    <div className="message-info">
                        
                        <div className="contact-details">
                            <div className="name-part">
                                <div className="sender">
                                    <p>Name</p>
                                    <input type="name" />
                                </div>
                                <div className="company">
                                    <p>Company</p>
                                    <input type="name" />
                                </div>
                            </div>
                            <div className="reach">
                                <div className="number">
                                    <p>Number</p>
                                    <input type="tel" />
                                </div>
                                <div className="email">
                                    <p>Email</p>
                                    <input type="email" />
                                </div>
                            </div>
                        </div>

                        <div className="message-part">
                            <div className="object">
                                <p>Object</p>
                                <input type="text" />
                            </div>
                            <div className="message">
                                <p>Message</p>
                                <textarea />
                            </div>
                        </div>
                         
                        <input className="send-button" type="submit" value="send" />
                        
                    </div>
                </div>
            </div>
        </main>
        
        
    )
}

export default MainPage