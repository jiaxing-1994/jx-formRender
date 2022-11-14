class StroageStrategy {
  private strategy: string;
  private strategyMap: {
    [key: string]: any;
  };
  constructor(strategy: string) {
    this.strategyMap = {
      h5: localStorage,
      session: sessionStorage,
    };
    this.strategy = strategy;
  }

  setItem(key: string, value: any) {
    return this.strategyMap[this.strategy].setItem(key, JSON.stringify(value));
  }

  setSessionItem(key: string, value: any) {
    return this.strategyMap.session.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(this.strategyMap[this.strategy].getItem(key));
  }

  getSessionItem(key: string) {
    return JSON.parse(this.strategyMap.session.getItem(key));
  }
}

class Stroage {
  private namespace: string;
  private storageObj: Record<string, any>;
  private sessionStroageObj: Record<string, any>;
  private storageInstance: StroageStrategy;
  constructor(namespace: string, strategy = "h5") {
    this.namespace = namespace;
    this.storageObj = {};
    this.sessionStroageObj = {};
    this.storageInstance = new StroageStrategy(strategy);
    this.init();
  }

  init() {
    if (this.storageInstance.getItem(this.namespace)) {
      this.storageObj = this.storageInstance.getItem(this.namespace);
    } else {
      this.storageInstance.setItem(this.namespace, {});
    }
    if (this.storageInstance.getSessionItem(this.namespace)) {
      this.sessionStroageObj = this.storageInstance.getSessionItem(this.namespace);
    } else {
      this.storageInstance.setSessionItem(this.namespace, {});
    }
  }

  removeItem(key: string) {
    if (this.storageInstance.getSessionItem(this.namespace)) {
      if (key in this.storageObj) {
        delete this.storageObj[key];
      }
      this.storageInstance.setSessionItem(this.namespace, this.storageObj);
    } else {
      throw new Error("储存器未实例化");
    }
  }

  removeSessionItem(key: string) {
    if (this.storageInstance.getItem(this.namespace)) {
      if (key in this.sessionStroageObj) {
        delete this.sessionStroageObj[key];
      }
      this.storageInstance.setItem(this.namespace, this.sessionStroageObj);
    } else {
      throw new Error("储存器未实例化");
    }
  }

  setItem(key: string, value: any) {
    if (this.storageInstance.getItem(this.namespace)) {
      this.storageObj[key] = value;
      this.storageInstance.setItem(this.namespace, this.storageObj);
    } else {
      throw new Error("储存器未实例化");
    }
  }

  setSessionItem(key: string, value: any) {
    if (this.storageInstance.getSessionItem(this.namespace)) {
      this.sessionStroageObj[key] = value;
      this.storageInstance.setSessionItem(this.namespace, this.sessionStroageObj);
    } else {
      throw new Error("储存器未实例化");
    }
  }

  getItem(key: string) {
    if (this.storageObj[key]) {
      return this.storageObj[key];
    }
    return "";
  }

  getSessionItem(key: string) {
    if (this.sessionStroageObj[key]) {
      return this.sessionStroageObj[key];
    }
    return "";
  }
}

export default Stroage;
