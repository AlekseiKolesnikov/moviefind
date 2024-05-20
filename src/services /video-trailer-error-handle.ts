import axios from "axios";
import { videoTrailerData } from "../data/video-trailer.ts";

export async function videoTrailerErrorHandle(): Promise<string> {
    let video = '';
    try {
        video = await axios.get(videoTrailerData.videoUrl, { timeout: 1000 })
    } catch (e) {
        if (e) {
            console.log('Video was not loaded')
            video = videoTrailerData.posterUrl
        }
    }
    return video
}