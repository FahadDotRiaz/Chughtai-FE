export default function CustomFieldLabel({ label, children }) {
  return (
    <>
      <div className="ant-col ant-col-24 ant-form-item-label">
        <label>{label}</label>
      </div>
      {children}
    </>
  );
}
