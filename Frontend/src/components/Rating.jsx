const Rating = ({ rating }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i < rating ? 'text-yellow-500 text-lg' : 'text-gray-400 text-lg'
          }
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return <div className='flex items-center mt-1'>{renderStars(rating)}</div>;
};
export default Rating;
