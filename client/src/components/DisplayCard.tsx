interface DisplayCardProps {
    image: string;
    title: string;
  }
  
  const DisplayCard: React.FC<DisplayCardProps> = ({ image, title }) => {
    return (
      <div className="card" >
        <img src={image} alt={title} />
        <h3 className="merienda-regular">{title}</h3>
      </div>
    );
  };
  
  export default DisplayCard;
  