import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const getCameraRollPermission = async () => {
  // iosの時のみ実行する
  if (!!Constants.platform && Constants.platform.ios) {
    // statusに「カメラロールが許可されているか？」も情報が返ってくる
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("画像を選択するためにはカメラロールの許可が必要です");
    }
  }
};

/**
 * image-pickerを起動する処理
 */
export const pickImage = async () => {
  // パーミッションの取得
  await getCameraRollPermission();
  // ImagePicker起動
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
  });
  if (!result.cancelled) {
    return result.uri;
  }
  return "";
};
