interface BuyCardProps {
  image: string;
  title: string;
  onAction: () => void;
  buttonText: string;
}

const BuyCard: React.FC<BuyCardProps> = ({ image, title, onAction, buttonText }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3 className="merienda-regular">{title}</h3>
      <button onClick={onAction}  className="merienda-regular">{buttonText}</button>
    </div>
  );
};

export default BuyCard;
