// import { Modal } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import ic_image_default from "../../assets/icons/ic_image_default.svg";
import ic_user_default from "../../assets/icons/ic_user_default.svg";
import { ApiConfig } from "../../services/api-config";
import { Modal } from "antd";

interface ImageProps {
    url?: string;
    className?: string;
    onClick?: () => void;
    fallBackUrl?: string;
    style?: React.CSSProperties;
    isLocal?: boolean;
    isUser?: boolean;
    isReview?: boolean;
}

const ImageCustom: FC<ImageProps> = ({
    url,
    className,
    onClick,
    fallBackUrl,
    style,
    isLocal = true,
    isUser = true,
    isReview = false,
}: ImageProps) => {
    const [imageSrc, setImageSrc] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imageDefault = isUser ? ic_user_default : ic_image_default;

    useEffect(() => {
        const resolvedUrl = url ?? imageDefault;
        setImageSrc(isLocal ? resolvedUrl : `${ApiConfig.IMAGE_URL}${resolvedUrl}`);
    }, [url, isLocal, imageDefault]);

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.onerror = null; // prevents looping if image onError also fails
        event.currentTarget.src = fallBackUrl ?? imageDefault;
    };

    const handleClick = () => {
        if (isReview) {
            setIsModalOpen(true);
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <>
            {onClick || isReview ? (
                <button className="w-full h-full p-0 border-none" onClick={handleClick} style={style}>
                    <img className={className} src={imageSrc} onError={handleError} alt="" />
                </button>
            ) : (
                <img className={className} src={imageSrc} onError={handleError} style={style} alt="" />
            )}

            {isReview && (
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    // size="80%"
                    // withCloseButton={false}
                    // transitionDuration={350}
                    // exitTransitionDuration={350}
                >
                    <div style={{ height: "calc(100vh - 48px - 48px)" }} className="p-2">
                        <img className="object-contain w-full h-full" src={imageSrc} onError={handleError} alt="" />
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ImageCustom;
