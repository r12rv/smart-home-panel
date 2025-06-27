function DeviceWidget({ name, status, value, onToggle }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{name}</h3>
      {status !== undefined ? (
        <p>Status: {status ? 'On' : 'Off'}</p>
      ) : (
        <p>Value: {value}°C</p>
      )}
      {status !== undefined && <button onClick={onToggle}>Toggle</button>}
    </div>
  );
}
export default DeviceWidget;