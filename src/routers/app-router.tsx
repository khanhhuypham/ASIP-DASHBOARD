import BookingPage from "../features/booking/booking-page";
import FinancePage from "../features/finance/finance-page";

import { ROUTE_LINK } from "./module-router";
import { Dashboard } from "../features/dashboard/dashboard";
import AssociationFlatform from "../features/association/association";
import {  AreaPage } from "../features/room-diagram/area/area";
import { RoomAndAssociation } from "../features/room-diagram/room-and-association/room-and-association";
import { PriceSetting } from "../features/room-diagram/price-setting/price-setting";
import RoomTypePage from "../features/room-diagram/room-type/room-type";
import GuestGroupPage from "../features/guest/guest-group/guest-group";
import GuestListPage from "../features/guest/guest-list/customer-management";


export const dashboardRouter = [
    { path: ROUTE_LINK.DASHBOARD, component: <Dashboard /> },
    { path: ROUTE_LINK.BOOKING_LIST, component: <BookingPage /> },
    { path: ROUTE_LINK.ROOM_TYPE, component: <RoomTypePage /> },
    { path: ROUTE_LINK.GUEST_LIST, component: <GuestListPage /> },
    { path: ROUTE_LINK.GUEST_GROUP, component: <GuestGroupPage /> },
    { path: ROUTE_LINK.FINANCE, component: <FinancePage /> },
    { path: ROUTE_LINK.ASSOCIATION, component: <AssociationFlatform /> },
    { path: ROUTE_LINK.ROOM_AND_ASSOCIATION, component: <RoomAndAssociation /> },

    { path: ROUTE_LINK.AREA, component: <AreaPage /> },
    { path: ROUTE_LINK.PRICE_SETTING, component: <PriceSetting /> },
];
