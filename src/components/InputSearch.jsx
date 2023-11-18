import { Form } from "react-bootstrap";

const InputSearch = ({ searchInput, handleSearch }) => {
  return (
    <div className="search-section">
      <Form onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Type something to search..."
          className="search-input"
          ref={searchInput}
        />
      </Form>
    </div>
  );
};

export default InputSearch;
