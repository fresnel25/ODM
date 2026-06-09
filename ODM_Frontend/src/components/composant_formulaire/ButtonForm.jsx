const ButtonForm = ({title, onClick, icon}) => {
  return (
    <div>
      <button type="submit" onClick={onClick} className="btn btn-primary btn-sm xl:btn-md">{icon} {title}</button>
    </div>
  );
};

export default ButtonForm;
