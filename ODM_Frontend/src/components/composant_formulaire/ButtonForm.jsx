const ButtonForm = ({title, onClick}) => {
  return (
    <div>
      <button type="submit" onClick={onClick} className="btn buttom-custom rounded-2xl">{title}</button>
    </div>
  );
};

export default ButtonForm;
