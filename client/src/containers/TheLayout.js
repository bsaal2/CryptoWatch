import { TheHeader, TheContent, TheFooter } from "./";

const TheLayout = () => {
    return (
        <div className="layout">
            <TheHeader />
            <TheContent />
            <TheFooter />
        </div>
    )
}

export default TheLayout;