import * as ScreenOrientation from "expo-screen-orientation";

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE
  );
}

export default changeScreenOrientation;
