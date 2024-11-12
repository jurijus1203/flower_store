import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './flowerList.css';

export default function FlowerList() {
    const [flowers, setFlowers] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/flowers/')
            .then(response => setFlowers(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleQuantityChange = (id, value) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max(1, (prevQuantities[id] || 1) + value)
        }));
    };

    const handleAddToCart = (flower) => {
        const quantity = quantities[flower.id] || 1;
        setCartItems(prevCartItems => {
            const itemIndex = prevCartItems.findIndex(item => item.id === flower.id);
            if (itemIndex !== -1) {
                const updatedItems = [...prevCartItems];
                updatedItems[itemIndex].quantity += quantity;
                return updatedItems;
            }
            return [...prevCartItems, { ...flower, quantity }];
        });
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="container-fluid bg-dark text-light p-0">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
                <a className="navbar-brand" href="/">🌸 Flower Shop</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Главная</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">О нас</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Контакты</a>
                        </li>
                    </ul>
                    <div className="position-relative ml-auto">
                        <div className="cart-icon" onClick={toggleCart} style={{ cursor: 'pointer' }}>
                            <FaShoppingCart size={24} className="text-white" />
                            {cartItems.length > 0 && (
                                <span className="badge badge-success position-absolute top-0 start-100 translate-middle p-1 rounded-circle">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                        {isCartOpen && (
                            <div className="cart-dropdown bg-secondary text-white p-3 position-absolute top-100 end-0 mt-2 rounded shadow" style={{ zIndex: 10 }}>
                                <h5>Корзина</h5>
                                {cartItems.length > 0 ? (
                                    <ul className="list-unstyled">
                                        {cartItems.map(item => (
                                            <li key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                                                <span>{item.name} x {item.quantity}</span>
                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            </li>
                                        ))}
                                        <div className='button-cart-payment'>
                                            <button className='btn btn-outline-light'>Оплатить</button>
                                        </div>
                                        
                                    </ul>
                                    
                                ) : (
                                    <p>Корзина пуста</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container text-center my-4">
                <h1 className="display-4 text-success">Найдите идеальные цветы для любого повода</h1>
                <p className="lead">У нас вы найдёте свежие букеты и экзотические растения 🌹</p>
            </div>

            <div className="container">
                <div className="row">
                    {flowers.map(flower => (
                        <div key={flower.id} className="col-md-4 mb-4">
                            <div className="card flower-card shadow-sm bg-secondary text-white rounded border-0">
                                <img src={`http://localhost:8000${flower.image_url}`} className="card-img-top rounded-top" alt={flower.name} style={{ height: '300px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title text-light">{flower.name}</h5>
                                    <p className="card-text text-muted">{flower.description}</p>
                                    <p className="card-text">
                                        <span className="text-warning font-weight-bold">Цена: ${flower.price}</span>
                                    </p>
                                    <p className="card-text">
                                        <span className={`badge ${flower.in_stock ? 'bg-success' : 'bg-danger'}`}>
                                            {flower.in_stock ? 'В наличии' : 'Нет в наличии'}
                                        </span>
                                    </p>

                                    <div className="input-group mb-3">
                                        <button
                                            className="btn btn-outline-light"
                                            onClick={() => handleQuantityChange(flower.id, -1)}
                                            disabled={!flower.in_stock || (quantities[flower.id] || 1) <= 1}
                                        >-</button>
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            value={quantities[flower.id] || 1}
                                            readOnly
                                        />
                                        <button
                                            className="btn btn-outline-light"
                                            onClick={() => handleQuantityChange(flower.id, 1)}
                                            disabled={!flower.in_stock}
                                        >+</button>
                                    </div>
                                    
                                    <button
                                        className="btn btn-success w-100"
                                        onClick={() => handleAddToCart(flower)}
                                        disabled={!flower.in_stock}
                                    >
                                        Добавить в корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="bg-dark text-light text-center py-3 mt-4 border-top border-secondary">
                <p className="mb-0">© 2024 Flower Shop | Все права защищены</p>
                <p className="small">Свежие цветы, заботливо упакованные для вас 🌷</p>
            </footer>
        </div>
    );
}
