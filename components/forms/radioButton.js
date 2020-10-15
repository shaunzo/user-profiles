const RadioButton = ({ label }) => (
  <div className="radioInput-item">
    <span data={`${label}`} className="radioInput"></span> { label }

    <style jsx>{`
      .radioInput-item {
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 20px
      }

      .radioInput-item .radioInput {
          display: inline-block;
          width: 15px;
          height: 15px;
          border: 1px solid #fff;
          margin-right: 5px;
          margn-bottom: 5px;
      }

      .radioInput-item .radioInput {
          border-radius: 50%;
      }
    `}</style>
  </div>
);

export default RadioButton;