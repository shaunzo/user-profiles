const Checkbox = ({ label, selected }) => (
  <div className="checkbox-item">
    <span data={`${label}`} className={`checkbox ${selected ? "selected" : ""}`}></span> { label }

    <style jsx>{`
    .checkbox-item {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-right: 20px;
        white-space: nowrap;
    }

    .checkbox-item .checkbox {
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 1px solid #fff;
        margin-right: 5px;
        margn-bottom: 5px;
    }

    .checkbox.selected {
      background-color: #fff;
    }
    `}</style>
  </div>
);

export default Checkbox;