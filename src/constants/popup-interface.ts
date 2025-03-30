export interface PopupInterface {
    open: boolean,
    content?: JSX.Element | undefined,
    title:string
}


export interface IconProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}