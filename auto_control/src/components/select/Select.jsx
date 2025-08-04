
function Select({ options = [], value, onChange, className, style, name, label }) {
    return (
        <div id="select-all">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <select name={name} className={className} value={value} onChange={onChange} style={style} >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>

    )
}
export default Select