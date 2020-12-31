/**
 * 拡張子を返すメソッド
 * @param path
 */
export const getExtention = (path: string) => {
  return path.split(".").pop();
};
