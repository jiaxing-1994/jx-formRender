// import { wxLocationApi } from "@libs/wx/wxApi";
import { isWeixin } from "@wk-libs/utils";
import GDMap from "./gaodeMap";

export function useAPI() {
  // 定位
  const getLocationApi = async () => {
    // 微信定位
    if (isWeixin) {
      // return await wxLocationApi();
    }
    return await GDMap.getLocation();
  };
  // 逆编码
  const getAddress = async (point: [number, number]) => {
    return await GDMap.getAddress(point);
  };
  return {
    getAddress,

    getLocationApi,
  };
}

export function useMap() {
  const createMap = (id: string | HTMLElement, options: object = {}): GDMap => {
    return new GDMap(id, options);
  };
  return {
    createMap,
  };
}
