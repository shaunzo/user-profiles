const Checkbox = ({ label }) => (
  <div className="checkbox-item">
    <span data={`${label}`} className="checkbox"></span> { label }

    <style jsx>{`
    .checkbox-item {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 20px
    }

    .checkbox-item .checkbox {
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 1px solid #fff;
        margin-right: 5px;
        margn-bottom: 5px;
    }
    `}</style>
  </div>
);

export default Checkbox;