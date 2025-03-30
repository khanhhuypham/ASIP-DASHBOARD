import { useDispatch } from "react-redux";
import { toggleMenuContent } from "../../store/themeConfigSlice";
import { STRING_MENU } from "../../constants/menu-string";

const SettingPage = () => {
    const dispatch = useDispatch();
    dispatch(toggleMenuContent(STRING_MENU.SETTING))

    return (
        <div>
            <h1>Setting Page</h1>
        </div>
    );
}

export default SettingPage;