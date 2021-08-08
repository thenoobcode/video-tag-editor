import { environment } from "src/environments/environment"

const VideoController = environment.videoApiBaseUrl + "/";
export const APIRoutes = {
    SignIn: "",
    UploadRawVideo: VideoController+ "/",
    StreamVideo: VideoController+ "/",
    UploadVideoEdits: VideoController+ "/"
}