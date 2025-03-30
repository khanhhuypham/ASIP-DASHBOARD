import { useDispatch } from "react-redux";
import { toggleMenuContent } from "../../store/themeConfigSlice";
import { STRING_MENU } from "../../constants/menu-string";

const FinancePage = () => {
    const dispatch = useDispatch();
    dispatch(toggleMenuContent(STRING_MENU.FINANCE))

    return (
        <div>
            <h1>Finance Page</h1>
        </div>
    );
}

export default FinancePage;