import './VideoTrailerFeature.css'
import '../../../assets/styles/flex-patterns.css'
import { useEffect, useRef, useState } from "react";
import { useHandelResize } from "../../../hooks/useHandelResize.ts";
import { videoTrailerErrorHandle } from "../../../services /video-trailer-error-handle.ts";

export const VideoTrailerFeature = () => {
    const [videoUrl, setVideoUrl] = useState('')
    const [videoTrailerContainerSize, setVideoTrailerContainerSize] = useState(0)
    const handleResize = useHandelResize()
    const videoTrailerElement = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const videoElement = videoTrailerElement.current
        const handleLoadedMetadata = () => {
            if (videoTrailerElement.current) {
                setVideoTrailerContainerSize(videoTrailerElement.current.offsetHeight)
            }
            videoTrailerErrorHandle().then(value => setVideoUrl(value))
        }
        if (videoTrailerElement.current) {
            setVideoTrailerContainerSize(videoTrailerElement.current.offsetHeight)
        }

        if (videoElement) {
            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
        }
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
            }
        }
    }, [handleResize.isResized])

    return (
        <div className="video-trailer__container">
            <div
                className="video-trailer__movie_inf_container space-between-column-start-flex"
                style={{ height: videoTrailerContainerSize }}
            >
                <img className="video-trailer__dune-logo" src="../../../../src/assets/images/dune_logo.png"
                     alt="dune_logo"/>
                <p><span>Genres: </span>Action, Adventure, Drama, Sci-Fi</p>
                <p>
                    Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the
                    conspirators who destroyed his family. Facing a choice between the love of his life and the fate of
                    the known universe, he endeavors to prevent a terrible future only he can foresee.
                </p>
                <p>
                    <span>Cast: </span>Timothée Chalamet, Zendaya, Rebecca Ferguson, Rebecca Ferguson, Josh Brolin,
                    Austin Butler
                </p>
                <button className="video-trailer__button space-between-row-center-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="13px"
                         height="15px" viewBox="-0.5 0 8 8" version="1.1" fill="#000000">

                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                        <g id="SVGRepo_iconCarrier"><title>play [#ffffff]</title>
                            <desc>Created with Sketch.</desc>
                            <defs></defs>
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Dribbble-Light-Preview" transform="translate(-427.000000, -3765.000000)"
                                   fill="#ffffff">
                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                        <polygon id="play-[#ffffff]" points="371 3605 371 3613 378 3609"></polygon>
                                    </g>
                                </g>
                            </g>
                        </g>

                    </svg>
                    <p>Watch</p>
                </button>
            </div>
            <video className="video-trailer__video"
                   id="video_trailer"
                   ref={videoTrailerElement}
                   controls={false}
                   autoPlay={true} loop={true} muted={true}
                   poster={videoUrl}
            >
                <source type="video/mp4" src="https://od.lk/s/MTNfMjQ0NDc1MDdf/video_trailer.mp4" id="video_trailer"/>
            </video>
        </div>
    )
}

