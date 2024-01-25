import './Product.css';

const Product = (props) => {

  const itemIndex = props.itemIndex;
  const item = props.item;

  return (
    <a className="item-container" key={itemIndex} href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <div className="item-container-frame">
        <div className="item-container-title">{item.title}</div>
        <div className="item-container-price">{item.price}</div>
      </div>
    </a>
  );
};

export default Product;