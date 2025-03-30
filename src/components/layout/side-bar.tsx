import { useState } from "react";
import { STRING_MENU } from "../../constants/menu-string";
import { ROUTE_LINK } from "../../routers/module-router";
import IconGrid1_2 from "../icons/icon-grid-1-2";
import IconCalendarEvent from "../icons/side-bar/icon-calendar-event";
import IconDiagram from "../icons/side-bar/icon-diagram";
import IconLink from "../icons/side-bar/icon-link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import AnimateHeight from "react-animate-height";
import IconCaretsDown from "../icons/icon-carets-down";
import { NavLink, useNavigate } from "react-router-dom";
import IconPeople from "../icons/icon-people";
import IconCaretDown from "../icons/icon-caret-down";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toggleSidebar } from "../../store/themeConfigSlice";

interface SideBarSection {
    label: string,
    key: React.Key,
    items: SideBarItem[]
}

interface SideBarItem {
    label: string,
    key: React.Key,
    navLink?: string,
    icon?: React.ReactNode,
    children?: SideBarItem[]
    select?: boolean
}


const menu: SideBarSection[] = [

    {
        label: STRING_MENU.DASHBOARD,
        key: STRING_MENU.DASHBOARD,
        items: [
            {
                label: STRING_MENU.DASHBOARD,
                key: STRING_MENU.DASHBOARD,
                navLink: ROUTE_LINK.DASHBOARD,
                icon: (<IconGrid1_2/>),
            },


            {
                label: STRING_MENU.BOOKING_LIST,
                key: STRING_MENU.BOOKING_LIST,
                navLink: ROUTE_LINK.BOOKING_LIST,
                icon: (<IconCalendarEvent />),
            },


            {
                label: STRING_MENU.ASSOCIATION,
                key: STRING_MENU.ASSOCIATION,
                navLink: ROUTE_LINK.ASSOCIATION,
                icon: (<IconLink />),
            },

        ]
    },
    {
        label: "Quản lý",
        key: "Quản lý",
        items: [

            {
                label: STRING_MENU.ROOM_DIAGRAM,
                key: STRING_MENU.ROOM_DIAGRAM,
                icon: (<IconDiagram />),
                children: [
                    {
                        label: STRING_MENU.ROOM_TYPE,
                        key: STRING_MENU.ROOM_TYPE,
                        navLink: ROUTE_LINK.ROOM_TYPE,
                    },
                    {
                        label: STRING_MENU.ROOM_AND_ASSOCIATION,
                        key: STRING_MENU.ROOM_AND_ASSOCIATION,
                        navLink: ROUTE_LINK.ROOM_AND_ASSOCIATION,
                    },
                    {
                        label: STRING_MENU.AREA,
                        key: STRING_MENU.AREA,
                        navLink: ROUTE_LINK.AREA,
                    },
                    {
                        label: STRING_MENU.PRICE_SETTING,
                        key: STRING_MENU.PRICE_SETTING,
                        navLink: ROUTE_LINK.PRICE_SETTING,
                    },

                ],
            },

            {
                label: STRING_MENU.GUEST,
                key: STRING_MENU.GUEST,
                icon: (<IconPeople />),
                children: [
                    {
                        label: STRING_MENU.GUEST_LIST,
                        key: STRING_MENU.GUEST_LIST,
                        navLink: ROUTE_LINK.GUEST_LIST,
                    },
                    {
                        label: STRING_MENU.GUEST_GROUP,
                        key: STRING_MENU.GUEST_GROUP,
                        navLink: ROUTE_LINK.GUEST_GROUP,
                    },
                    {
                        label: STRING_MENU.STAY_GUEST,
                        key: STRING_MENU.STAY_GUEST,
                        navLink: ROUTE_LINK.STAY_GUEST,
                    },

                ],
            },
            {
                label: "Hoá đơn",
                key: "Hoá đơn",
                navLink: ROUTE_LINK.ASSOCIATION,
                icon: (<IconLink />),
            },

        ]
    }

];


const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const semidry = useSelector((state: IRootState) => state.themeConfig.semidark);
    const [section, setSection] = useState<SideBarSection[]>(menu)

    const toggleMenu = (item: SideBarItem) => {
        const newSections = updateSection(section, item.key.toString());
        setSection(newSections);
    };



    const updateSection = (sections: SideBarSection[], keyToToggle: string): SideBarSection[] => {

        const updateItem = (items: SideBarItem[], key: string): SideBarItem[] => {

            return items.map((item) => {
                if (item.key === keyToToggle) {
               
                    return { ...item, select: !item.select };
                } else if (item.children) {
                    return { ...item, children: updateItem(item.children, keyToToggle) };
                } else {
                    return { ...item, select: false };
                }
            })

        }

        return sections.map((section) => {

            const items: SideBarItem[] = section.items.map(item => {
                
                if (item.key === keyToToggle) {
         
    
                    return { ...item, select: !item.select };
                } else if (item.children) {
                    return { ...item, children: updateItem(item.children, keyToToggle) };
                } else {
                    return { ...item, select: false };
                }
            })


            return { ...section, items: items }
        });

    };

    const renderItem = (item: SideBarItem) => {

        if (item.children && item.children.length > 0) {
            return (
                <>
                    <button
                        type="button"
                        className={`w-full ${item.select ? "active" : ""}`}
                        onClick={() => toggleMenu(item)}
                    >
                        <div className="flex justify-between items-center py-3 px-6">
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-gray-500 dark:text-[#C5C6C9] dark:group-hover:text-white-dark">
                                    {item.label}
                                </span>
                            </div>

                            <div className={!item.select ? "rtl:rotate-90 -rotate-90" : ""}>
                                <IconCaretDown
                                    className={
                                        item.select
                                            ? "fill-orange-500 dark:group-hover:fill-white-dark"
                                            : "fill-gray-500 group-hover:fill-orange-500 "
                                    }
                                />
                            </div>
                        </div>

                    </button>

                    <AnimateHeight duration={300} height={item.select ? "auto" : 0}>
                        <ul className="relative font-semibold space-y-0.5 py-3 px-6">
                            {item.children.map((child) => {
                                return (
                                    <li>
                                        {renderItem(child)}
                                    </li>
                                )
                            })}
                        </ul>
                    </AnimateHeight>
                </>
            )
        } else {
            return (
                <button onClick={() =>{
                    navigate(item.navLink ?? "")
                    toggleMenu(item)
                }} className="relative w-full rounded">
                    {item.select && <div className="absolute w-[4px] h-full left-0 top-0 bg-blue-600 rounded-r-xl"></div>}
                    <div className={`flex items-center gap-3 py-3 pl-6 ${item.select ? "bg-blue-100" : ""}`} >

                        {item.icon}
                        <span className={`${item.select ? "text-blue-600" : "text-gray-500"}`}>
                            {item.label}
                        </span>

                    </div>
                </button>
            )
        }
    };


    return (
        <div className={semidry ? "dark" : ""}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidry ? "text-white-dark" : ""
                    }`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <NavLink to="/" className="flex items-center main-logo shrink-0">
                            {/* <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" /> */}
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                                ASIP
                            </span>
                        </NavLink>

                        <button
                            type="button"
                            className="flex items-center w-8 h-8 transition duration-300 rounded-full collapse-icon hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">

                        {section.map((s) => {
                            return (
                                <div className="space-y-4">
                                    <hr />
                                    <div>
                                        <p className="text-gray-400 font-semibold pl-4">{s.label}</p>
                                        <ul className="relative font-semibold space-y-0.5">
                                            {s.items.map((item) =>
                                                <li className="">
                                                    {renderItem(item)}
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                </div>
                            )
                        })}

                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;


