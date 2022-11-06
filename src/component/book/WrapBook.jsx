import CardBook from './CardBook'

const WrapBook = (props) => {
    return (
        <div className="wrap-book row">
        {props.data.map(val => (
            <CardBook key={val.id_book} item={val}/>
        ))}
        </div>
    )
}

export default WrapBook