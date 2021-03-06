import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import globalStyles from '../constants/styles';
import ShopItem from '../components/ShopItem';
import {getShopItems} from '../services/shop';
import LoadingSpinner from '../components/LoadingSpinner';


function ShopView(props) {
    const [items, setItems] = useState([
        {
            _id: '1',
            name: "Pizzetos",
            description: "PizzaBlock's main currency",
            longDesc: "This is PizzaBlock's main currency. In order to enter a game to win a pizza, you must pay with pizzetos.",
            price: 10,
            imgUrl: "https://cdn.discordapp.com/attachments/363727070683201538/704883158021177404/icon_pizza_v1.png"
        },
        {
            _id: '2',
            name: "Super skin",
            description: "Customize your gameplay with this skins",
            longDesc: "Change the way you play with the new colors of this awesome skin that will send you flying.",
            price: 50,
            imgUrl: "https://www.minecraftskins.com/uploads/preview-skins/2020/04/11/coronavirus-proof-tetris-skin-14102563.png?v186"
        },
    ])

    const [viewItem, setViewItem] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [loading, setLoading] = useState(true)

    const history = useHistory();

    useEffect(() => {
        getItems();
    }, [])

    const getItems = () => {
        getShopItems()
            .then(response => {
                setItems(response);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const onClickMore = (e) => {
        setSelectedItem(items[e.target.value]);
        setViewItem(true);
    }

    const onBackToShop = () => {
        setViewItem(false);
    }

    return (
        <div>
            <h1 className='text-center mb-5'>Shop</h1>
            {loading ? <LoadingSpinner/> :
            <div style={styles.mainContainer}>
                <div style={styles.groupContainer}>
                    {viewItem ? <ShopItem item={selectedItem} back={onBackToShop}/> : 
                    <div>
                        {items.map((item, i) => {
                            return (
                                <Card style={styles.groupCard} className={"hvr-grow-shadow"}>
                                    <Card.Img style={styles.thumbnail} variant="top" src={item.imgUrl} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Button
                                            value={i}
                                            variant="flat"
                                            bg="flat"
                                            style={globalStyles.primaryButton}
                                            onClick={onClickMore}
                                        >
                                            More
                                        </Button>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div> 
                    }
                </div>
            </div>
            }
        </div>
    )
}

const styles = {
    groupContainer: {
        display: 'block',
        float: 'left',
        textAlign: 'center'
    },
    groupCard: {
        height: '400px',
        margin: '30px',
        display: 'block;',
        float: 'left',
        width: '18rem'
    },
    thumbnail: {
        width: '18rem',
        height: '50%',
        objectFit: 'cover'
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
}

export default ShopView