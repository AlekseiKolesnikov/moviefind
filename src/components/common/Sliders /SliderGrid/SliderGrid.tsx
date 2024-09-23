import './SliderGrid.css'
import { SliderGridColumn } from "../SliderGridColumn/SliderGridColumn.tsx";


export const SliderGrid = ({ sliderId, label, index, type }: { sliderId: number, label: string, index: number, type: string }) => {

    return (
        <div
            className="grid-slider__container"
            style={index === 4 ? { paddingTop: "40px" } : { paddingTop: "0" }}
        >
            <p className="grid-slider__container-label">{label}</p>
            <div
                className="grid-slider__two-column-flex-container start-row-center-flex"
            >
                <SliderGridColumn sliderId={sliderId} columnSize={[0, 4]} type={type}/>
                <SliderGridColumn sliderId={sliderId} columnSize={[5, 9]} type={type}/>
            </div>
        </div>
    )
}

