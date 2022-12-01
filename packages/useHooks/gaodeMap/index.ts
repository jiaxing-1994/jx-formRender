import { isArray } from "@wk-libs/utils";
import { PointType } from "./type";

export default class GDMap {
  public map: any;
  private infoWindow: any;
  private options: any;
  private location: any;
  private static location: [number, number] | null;
  constructor(id: string | HTMLElement, options: any) {
    this.options = options;
    this.location = null;
    this.infoWindow = null;
    this.createMap(id);
  }

  createMap(id: string | HTMLElement) {
    const mapOptions = {
      resizeEnable: true,
      features: ["bg", "road", "building", "point"],
      showBuildingBlock: false,
      expandZoomRange: true,
      zooms: [3, 20],
    };
    console.log(AMap);
    this.map = new AMap.Map(id, {
      ...mapOptions,
      ...this.options,
    });
  }

  static lngLat(point: PointType | [number, number]) {
    if (isArray(point) && point.length === 2) {
      return new AMap.LngLat(point[0], point[1]);
    }
    if ((!point.lat && !point.latitude) || (!point.lng && !point.longitude)) {
      throw new Error("未获取到有效坐标");
    }
    if (!point || (point.lat && point.lat < 1)) {
      throw new Error("未获取到有效坐标");
    }
    if (!point || (point.latitude && point.latitude < 1)) {
      throw new Error("未获取到有效坐标");
    }
    const lat = point.lat || point.latitude;
    const lng = point.lng || point.longitude;
    return new AMap.LngLat(lng, lat);
  }

  setCenter(point: PointType | [number, number]) {
    const lngLat = GDMap.lngLat(point);
    this.map.setCenter(lngLat);
  }

  getCenter() {
    return this.map.getCenter();
  }

  // 逆编码
  static getAddress(point: PointType | [number, number]) {
    const lngLat = GDMap.lngLat(point);
    return new Promise((resolve) => {
      AMap.plugin("AMap.Geocoder", function () {
        const geocoder = new AMap.Geocoder();
        geocoder.getAddress(lngLat, (status: string, result: any) => {
          if (status === "complete" && result.info === "OK") {
            const { regeocode } = result;
            const res: any = {
              province: regeocode.addressComponent.province,
              city: regeocode.addressComponent.city,
              county: regeocode.addressComponent.district,
              detailAddress: regeocode.formattedAddress,
            };
            resolve(res);
          } else {
            resolve(null);
          }
        });
      });
    });
  }

  // 定位
  static getLocation() {
    return new Promise((resolve, reject) => {
      if (this.location) {
        resolve(this.location);
        return;
      }
      AMap.plugin("AMap.Geolocation", () => {
        const geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量
          offset: [10, 20],
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          position: "RB",
        });
        geolocation.getCurrentPosition((status: string, result: any) => {
          console.log(result);
          if (status === "complete") {
            this.location = [result.position.lng, result.position.lat];
            resolve(this.location);
          } else {
            switch (result.originMessage) {
              case "Timeout expired":
                console.log("定位超时");
                break;
              default:
                console.log("定位错误");
                break;
            }
            reject();
            throw new Error(JSON.stringify(result));
          }
        });
      });
    });
  }

  // 绘制信息窗
  createInfoWindow(
    content: string | HTMLElement,
    point?: PointType | [number, number],
    options?: {}
  ) {
    if (!this.infoWindow) {
      this.infoWindow = new AMap.InfoWindow({
        content,
        offset: new AMap.Pixel(0, -40),
        ...options,
      });
    }
    if (point) {
      const lngLat = GDMap.lngLat(point);
      if (this.infoWindow.getIsOpen()) {
        this.infoWindow.setContent(content);
        this.infoWindow.setPosition(lngLat);
      } else {
        this.infoWindow.open(this.map, lngLat);
      }
    }
  }

  // 标记点
  addMarker(lnglat: [number, number]) {
    const marker = new AMap.Marker({
      position: new AMap.LngLat(lnglat[0], lnglat[1]),
      icon: new AMap.Icon({
        size: new AMap.Size(40, 40),
        image: "https://aqzl.obs.cn-south-1.myhuaweicloud.com/images/location.png",
        imageSize: new AMap.Size(40, 40),
      }),
      offset: new AMap.Pixel(-20, -40),
    });
    this.map.add(marker);
    return marker;
  }

  onEvent(name: string, callback: Function, isOff = false) {
    if (isOff) {
      this.map.off(name, callback);
    } else {
      this.map.on(name, callback);
    }
  }
}
