const Filter = ({ handleSelection }) => {
  const filter = ["anime", "nature", "abstract", "space"];
  return (
    <div className="filters">
      {filter.map((item, index) => {
        return (
          <div key={index} onClick={() => handleSelection(item)}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
