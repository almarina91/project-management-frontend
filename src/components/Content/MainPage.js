import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import ContentSection from "./ContentSection";
import { CLASS } from "../../utils/enums";
import { CurrentProjectContextProvider } from "../../context/currentProjectContext";
import { DisplayContextProvider } from "../../context/displayContext";
import { RefreshProjectListContextProvider } from "../../context/refreshProjectListContext";

/**
 * Main page component.
 */

function MainPage() {
    return(
        <div className={CLASS.pageContainer}>
            <DisplayContextProvider>
            <Header/>
                <CurrentProjectContextProvider>
                    <RefreshProjectListContextProvider>
                        <SideBar/>
                        <ContentSection/>
                    </RefreshProjectListContextProvider>
                </CurrentProjectContextProvider>
            </DisplayContextProvider>
        </div>
    )
}

export default MainPage;