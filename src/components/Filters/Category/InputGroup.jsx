function InputGroup({ total, name, setId }) {
  return (
    <div className="input-group mb-3">
      <select
        onChange={(e) => setId(e.target.value)}
        className="form-select"
        id={name}
      >
        {total ? (
          [...Array(total).keys()].map((item, index) => (
            <option key={index} value={item + 1}>
              {name} - {item + 1}
            </option>
          ))
        ) : (
          <option>Loading...</option>
        )}
      </select>
    </div>
  );
}

export default InputGroup;
