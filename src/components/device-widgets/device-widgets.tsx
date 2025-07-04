interface Props {
  name: string;
  status?: boolean;
  value?: number | string;
  onToggle: () => void;
  onRemove: () => void;
}

const DeviceWidget = (props: Props) => {
  return (
    <div className='border-1 rounded-lg m-2.5 p-2.5 bg-gray-50'>
      <h3 className='text-lg'>{props.name}</h3>
      {props.status !== undefined ? (
        <p>
          Status: {props.status ? 
            <span className='text-green-900'>On</span> : 
            <span className='text-red-900'>Off</span> 
          }
        </p>
      ) : (
        <p>Value: {props.value}°C</p>
      )}
      <div className="flex gap-1.5">
        {props.status !== undefined && <button className='base-button' onClick={props.onToggle}>Toggle</button>}
        <button className='base-button' onClick={props.onRemove}>Remove</button>
      </div>
    </div>
  );
}
export default DeviceWidget;