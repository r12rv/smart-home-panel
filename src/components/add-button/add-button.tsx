interface Props {
  onAdd: () => void
}

const AddButton = (props: Props) => {
  return (
    <div className="h-8 w-8 cursor-pointer" onClick={props.onAdd}>
      <img src={"./plus.svg"} />
    </div>
  );
};

export default AddButton;
