import { Carousel, Switch } from "antd"
import IconTag from "../../../../../../components/icons/icon-tag"
import IconCalendar from "../../../../../../components/icons/icon-calendar"
import IconGeometry from "../../../../../../components/icons/icon-geometry"
import { Room } from "../../../../../../models/room/room"
import { useEffect, useState } from "react"
import ic_image_default from "../../../../../../assets/icons/ic_image_default.svg";



export const GeneralInfor = ({ data }: { data: Room }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const onChange = (currentSlide: number) => {
        setCurrentSlide(currentSlide);
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentSlide(index);
    };

    useEffect(()=>{
        console.log(data.images)
    },[])

    return (
        <div>

            <div>
                <Carousel
                    arrows
                    infinite={true}
                    autoplay
                    beforeChange={onChange}
                    slickGoTo={currentSlide}
                >
                 
                    {data.images.map((img, index) => (
                        <div key={index}>
                            <img
                                style={contentStyle}
                                src={process.env.REACT_APP_IMAGE_URL + "/api/v1/media/" + img.url}
                                alt={`Image ${index + 1}`}
                                className='object-fill rounded-lg w-full px-5'
                                onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    console.log(event.currentTarget.src);
                                    event.currentTarget.onerror = null; // prevents looping if image onError also fails
                                    event.currentTarget.src = ic_image_default;
                                }}
                            />
                        </div>
                    ))}
                </Carousel>
                <div className='h-30 flex flex-nowrap gap-3 overflow-x-auto py-3 scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
                    {data.images.map((img, index) => (
                        <img
                            key={index}
                            src={process.env.REACT_APP_IMAGE_URL + "/api/v1/media/" + img.url}
                            alt={`Image ${index + 1}`}
                            width={100}
                            className={`object-fill rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform ${currentSlide === index ? 'scale-110 border-2 border-blue-500' : ''}`}
                            onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                console.log(event.currentTarget.src);
                                event.currentTarget.onerror = null; // prevents looping if image onError also fails
                                event.currentTarget.src = ic_image_default;
                            }}
                            onClick={() => handleThumbnailClick(index)}
                        />
                    ))}
                </div>

            </div>

            <div className='space-y-5 border p-3 rounded-xl'>
                <div className='flex justify-between items-center gap-2'>
                    <span className='font-semibold '>Hoạt động</span>
                    <Switch defaultChecked={data.active} />
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex justify-between items-center gap-2'>
                        <IconGeometry />
                        <span>Khu vực</span>
                    </div>
                    <span className='font-semibold'>{data.area.name}</span>
                </div>


                <div className='flex justify-between items-center'>
                    <div className='flex justify-between items-center gap-2'>
                        <IconTag />
                        <span>Giá phòng</span>
                    </div>
                    <span className='font-semibold'>đ1.000.000</span>
                </div>


                <div className='flex justify-between items-center'>
                    <div className='flex justify-between items-center gap-2'>
                        <IconCalendar />
                        <span>Bắt đầu hoạt động</span>
                    </div>
                    <span className='font-semibold'>29/12/2024</span>
                </div>
            </div>
        </div>
    )
}

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    background: '#364d79',
};
