import Carousel from 'better-react-carousel'

const carousel = [
    {
        header: 'X5',
        text: 'Acquiring a new customer is 5x more costly than making an unhappy customer happy'
    },
    {
        header: 'X3',
        text: 'Some text that is supposed to underline what X3 is meant'
    },
    {
        header: 'X6',
        text: 'Some text that is supposed to underline what X6 is meant'
    },
];

const LoginCarousel = () => {
    return (
        <div className="login-carousel" >
            <Carousel cols={1} rows={1} gap={10} loop hideArrow showDots dotColorActive={'#96CAF7'}>
                {carousel.map((item) => (
                    <Carousel.Item key={item.header + item.text}>
                        <div className="login-carousel-item">
                            <h2>{item.header}</h2>
                            <p>{item.text}</p>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div >
    )
}

export default LoginCarousel;